export interface AttribValues {
  attribute_id: number;
  name: String;
  values: {
    attribute_value_id: number;
    value: String;
  }[];
}
