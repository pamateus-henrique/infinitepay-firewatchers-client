import { severityField } from "../fields";

export default {
  id: "changeSeverity",
  title: "Change Incident Severity",
  fields: [severityField],
  apiEndpoint: "/incidents/update/severity",
};
