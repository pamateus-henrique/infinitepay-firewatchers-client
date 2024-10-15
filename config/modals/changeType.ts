import { typeField } from "../fields";

export default {
  id: "changeType",
  title: "Change Incident Type",
  fields: [typeField],
  apiEndpoint: "/incidents/update/type",
};
