import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import React, { ChangeEvent, useState } from "react";
import { HobTextField } from ".";

export default {
  title: "HobTextField"
};

const Container = styled.div`
  width: 400px;
  padding: 1rem;
`;

export const basic = () => {
  const value = "Harry Potter";
  return (
    <Container>
      <HobTextField value={value} onChange={action("changed")} />
    </Container>
  );
};

export const withState = () => {
  const [value, setValue] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    action("changed")(event);
    setValue(event.target.value);
  };
  return (
    <Container>
      <HobTextField
        value={value}
        onChange={onChange}
        placeholder="Enter Something"
      />
    </Container>
  );
};
