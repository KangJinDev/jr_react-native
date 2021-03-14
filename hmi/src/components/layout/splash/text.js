import styled from "@emotion/styled";
import {variant, typography} from "styled-system";
import {Box} from "./box";

export const Text = styled(Box)(
    typography,
    variant({prop: "type", scale: "texts"}),
    {label: "common--text"}
);

Text.defaultProps = {
    type: "main",
    as: "p"
};
