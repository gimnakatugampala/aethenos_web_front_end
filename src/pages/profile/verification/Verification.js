import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Persona from "persona";

import { useState } from "react";
import MainLoader from "../../../commonFunctions/loaders/MainLoader/MainLoader";
import {
  ChangeInstructorVerification,
  CheckInstructorVerification,
} from "../../../api";

const Verification = () => {
  const [loading, setloading] = useState(true);
  const [checkInstructorVerification, setcheckInstructorVerification] =
    useState(null);

  // -------- PERSONA ---------------
  const [options, setOptions] = useState({
    templateId: "itmpl_Sk2RjhY2ZzsfQd7Q3UMCCFfk",
  });

  // tmpl_JAZjHuAT738Q63BdgCuEJQre

  const [flowType, setFlowType] = useState("embedded");

  const embeddedClientRef = useRef(null);

  useEffect(() => {
    // Instructor verification
    CheckInstructorVerification(setcheckInstructorVerification);

    console.log(checkInstructorVerification);

    // PERSONA
    if (checkInstructorVerification == 0) {
      const client = new Persona.Client({
        templateId: "itmpl_Sk2RjhY2ZzsfQd7Q3UMCCFfk", // Make sure this is the production templateId
        environmentId: 'env_Rv1WdUFq23Lj2DFy9yKMt77L',
        onReady: () => client.open(),
        onLoad: (error) => {
          if (error) {
            setloading(false);
            console.error(
              `Failed with code: ${error.code} and message ${error.message}`
            );
          }

          client.open();
        },
        onStart: (inquiryId) => {
          console.log(`Started inquiry ${inquiryId}`);
        },
        onComplete: (inquiryId) => {
          console.log(`Sending finished inquiry ${inquiryId} to backend`);
          setloading(false);

          // Verify Instructor
          ChangeInstructorVerification();

          setTimeout(() => {
            window.location.href = "/courses";
          }, 1500);

          fetch(`/server-handler?inquiry-id=${inquiryId}`);
        },
        onEvent: (name, meta) => {
          switch (name) {
            case "start":
              console.log(`Received event: start`);
              setloading(false);
              break;
            default:
              setloading(false);
              console.log(
                `Received event: ${name} with meta: ${JSON.stringify(meta)}`
              );
          }
        },
      });
      embeddedClientRef.current = client;

      window.exit = (force) =>
        client ? client.exit(force) : alert("Initialize client first");
      return;
    }
  }, [checkInstructorVerification]);

  return (
    <div className="all-courses-container mb-5">
      <div
        className="row mb-4 mx-2"
        style={{ justifyContent: "space-between" }}
      >
        <div className="col-md-4">
          <Typography variant="h4" gutterBottom>
            Verification Process
          </Typography>
        </div>
      </div>

      <Card className="p-3">
        {loading ? (
          checkInstructorVerification == 1 ? (
            <div className="d-flex justify-content-center">
              <h4>Instructor Already Verified</h4>
            </div>
          ) : (
            <MainLoader />
          )
        ) : (
          ""
        )}
      </Card>
    </div>
  );
};

export default Verification;
