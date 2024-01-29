const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/auditdb");
}

const sechema = new mongoose.Schema({
  "Tran Id": { type: Number, required: true },
  "Challan Number": { type: String, required: true },
  "Student Name": { type: String, required: true },
  "Father Name": { type: String, required: true },
  Surname: { type: String },
  CNIC: { type: String, required: true },
  Program: { type: String, required: true },
  Description: { type: String, required: true },
  Company: { type: String, required: true },
  Amount: { type: Number, required: true },
  Channel: { type: String, required: true },
  "Transaction Date": { type: Date, required: true },
  "Transaction Time": { type: String, required: true },
});

const examination_semester = mongoose.model("examination_semester", sechema);
const admission_processing_fee = mongoose.model(
  "admission_processing_fee",
  sechema
);
const admission_fee = mongoose.model("admission_fee", sechema);
const admission_retain = mongoose.model("admission_retain", sechema);
const drgs_admission_processing_fee = mongoose.model(
  "drgs_admission_processing_fee",
  sechema
);
const drgs_challan = mongoose.model("drgs_challan", sechema);
const hostel_accomodation_fee_boys = mongoose.model(
  "hostel_accomodation_fee_boys",
  sechema
);
const hostel_accomodation_fee_girls = mongoose.model(
  "hostel_accomodation_fee_girls",
  sechema
);
const hostel_accomodation_fee_girls_pg = mongoose.model(
  "hostel_accomodation_fee_girls_pg",
  sechema
);
const examination_annual_certificate = mongoose.model(
  "examination_annual_certificate",
  sechema
);
const general_branch_annual = mongoose.model("general_branch_annual", sechema);
const examination_annual_exam_fee = mongoose.model(
  "examination_annual_exam_fee",
  sechema
);
const general_branch_on_campus = mongoose.model(
  "general_branch_on_campus",
  sechema
);
const examination_semester_affailated_college = mongoose.model(
  "examination_semester_affailated_college",
  sechema
);
const sutc = mongoose.model("sutc", sechema);

module.exports = {
  connectDB,
  examination_semester,
  admission_fee,
  admission_processing_fee,
  admission_retain,
  drgs_admission_processing_fee,
  drgs_challan,
  examination_annual_certificate,
  examination_annual_exam_fee,
  general_branch_annual,
  general_branch_on_campus,
  examination_semester_affailated_college,
  hostel_accomodation_fee_boys,
  hostel_accomodation_fee_girls,
  hostel_accomodation_fee_girls_pg,
  sutc,
};
