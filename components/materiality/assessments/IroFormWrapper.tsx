"use server"

import React from "react";
import { getIroData } from "@/lib/assessments/data";
import { getStakeholders } from "@/lib/stakeholders/data";
import IroFormClient from "./IroFormClient";

export default async function IroFormWrapper({ id }) {
  const iroData = await getIroData(id);
  const stakeholders = await getStakeholders();

  return <IroFormClient initialData={iroData[0]} id={id} stakeholders={stakeholders} />;
}