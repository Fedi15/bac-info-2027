import { db } from "hatchable";

export const access = "public";
export const methods = ["POST"];

function clean(value, max=500) {
  return typeof value === "string" ? value.trim().slice(0,max) : "";
}

export default async function(req,res){
  const body = req.body || {};
  const full_name = clean(body.full_name,120);
  const phone = clean(body.phone,30);
  const level = clean(body.level,80);
  const school = clean(body.school,150);
  const city = clean(body.city,100);
  const interest = clean(body.interest,120);
  const availability = clean(body.availability,80);
  const source = clean(body.source,100);

  if(!full_name || !phone || !level || !interest){
    return res.status(400).json({ok:false,error:"Missing required fields"});
  }

  await db.query(
    "INSERT INTO student_leads (full_name, phone, level, school, city, interest, availability, source) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
    [full_name,phone,level,school,city,interest,availability,source]
  );

  res.status(201).json({ok:true});
}