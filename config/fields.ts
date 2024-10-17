// config/fields.ts

export const leadField = {
  name: "lead",
  data: "users",
  label: "Incident Lead",
  initialData: "lead",
  type: "userSelect",
  optionsEndpoint: "/users",
  valueType: "number",
};

export const QEField = {
  name: "qe",
  data: "users",
  label: "QE",
  initialData: "qe",
  type: "userSelect",
  optionsEndpoint: "/users",
  valueType: "number",
};

export const severityField = {
  name: "severity",
  label: "New Severity",
  initialData: "severity",
  data: "severity",
  type: "select",
  optionsEndpoint: "/options/severity",
  valueType: "string",
};

export const typeField = {
  name: "type",
  label: "New Type",
  data: "type",
  initialData: "type",
  type: "select",
  optionsEndpoint: "/options/types",
  valueType: "string",
};

export const statusField = {
  name: "status",
  label: "New Status",
  data: "status",
  initialData: "status",
  type: "select",
  optionsEndpoint: "/options/status",
  valueType: "string",
};

// Add more fields as needed
