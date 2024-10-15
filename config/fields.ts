// config/fields.ts

export const leadField = {
  name: "lead",
  data: "users",
  label: "Incident Lead",
  initialData: "lead",
  type: "userSelect",
  optionsEndpoint: "/users",
};

export const QEField = {
  name: "qe",
  data: "users",
  label: "QE",
  initialData: "QE",
  type: "userSelect",
  optionsEndpoint: "/users",
};

export const severityField = {
  name: "severity",
  label: "New Severity",
  initialData: "severity",
  data: "severity",
  type: "select",
  optionsEndpoint: "/options/severity",
};

export const typeField = {
  name: "type",
  label: "New Type",
  data: "type",
  initialData: "type",
  type: "select",
  optionsEndpoint: "/options/types",
};

export const statusField = {
  name: "status",
  label: "New Status",
  data: "status",
  initialData: "status",
  type: "select",
  optionsEndpoint: "/options/status",
};

// Add more fields as needed
