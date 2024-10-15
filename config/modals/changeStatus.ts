import { statusField } from "../fields";

export default {
  id: "changeStatus",
  title: "Change Incident Status",
  fields: [statusField],
  apiEndpoint: "/incidents/update/status",
};
