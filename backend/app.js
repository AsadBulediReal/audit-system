require("dotenv").config();

const app = require("express")();
const fileUpload = require("express-fileupload");
const fs = require("fs");
const xlsx = require("xlsx");

const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");

// Add the express-fileupload middleware
app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/report", async (req, res) => {
  await db.connectDB();

  const savedFilePath = path.join(__dirname, "excel-file", "asad.xlsx"); // Adjust filename as needed

  const exists = fs.existsSync(savedFilePath);

  const createFile = (data) => {
    const dataToJson = JSON.stringify(data);
    const worksheet = xlsx.utils.json_to_sheet(JSON.parse(dataToJson));
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Save the file to the "excel-file" folder:
    xlsx.writeFile(workbook, savedFilePath);
  };

  const admission = await db["admission_fee"]
    .find({ Amount: 42000 })
    .select("-comments -__v -_id")
    .exec();

  createFile(admission);

  if (!exists) {
    return res.status(200);
  }

  return res.status(200).sendFile(savedFilePath);
});

app.post("/upload", async (req, res) => {
  const files = req.files;

  // Declare the variable `exists` outside of the `forEach()` loop.
  let exists = false;
  let file;
  let fileName;

  Object.keys(files).forEach(async (key) => {
    const filePath = path.join(__dirname, "excel-file", files[key].name);
    file = filePath;
    fileName = files[key].name;

    // Check if the file exists.
    exists = fs.existsSync(filePath);

    // If the file exists, do not run the `files[key].mv()` function.
    if (exists) {
      return res.status(200).json({
        status: 400,
        message: "please dont upload same file",
        title: "Same File",
      });
    }

    // Move the file to the destination directory.
    await files[key].mv(filePath, (err) => {
      if (err) {
        return res.status(200).json({
          status: 500,
          message: "Upload failed server side error",
          title: "Upload Failed",
        });
      }
    });
  });

  await db.connectDB();

  async function ConvetToJson(excelFilePath) {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    });
    return rawData;
  }

  const auditData = async (data) => {
    const categories = {
      10: "examination_semester",
      20: "admission_processing_fee",
      21: "admission_fee",
      22: "admission_retain",
      30: "drgs_admission_processing_fee",
      31: "drgs_challan",
      40: "hostel_accomodation_fee_boys",
      41: "hostel_accomodation_fee_girls",
      43: "hostel_accomodation_fee_girls_pg",
      50: "examination_annual_certificate",
      51: "general_branch_annual",
      52: "examination_annual_exam_fee",
      53: "general_branch_on_campus",
      54: "examination_semester_affailated_college",
      61: "sutc",
    };

    data.map(async (record) => {
      const getChallan = record[1].substr(0, 2);
      const getCategorie = await categories[getChallan];
      const challan = Number(record[1]);

      db[getCategorie].create({
        "Tran Id": record[0],
        "Challan Number": challan,
        "Student Name": record[2],
        "Father Name": record[3],
        Surname: record[4],
        CNIC: record[5],
        Program: record[6],
        Description: record[7],
        Company: record[8],
        Amount: record[9],
        Channel: record[10],
        "Transaction Date": record[11],
        "Transaction Time": record[12],
      });
    });
  };

  setTimeout(async () => {
    const data = await ConvetToJson(file);
    console.log(data.length);

    const execl = [];
    for (let i = 0; i < data.length; i++) {
      if (i > 7) {
        execl.push(data[i]);
      }
    }

    await auditData(execl);
    if (!exists) {
      return res
        .status(200)
        .json({ status: 200, message: "file successfully uploaded" });
    }
  }, 1000);
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
