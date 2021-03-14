import React from "react";
import styled from "@emotion/styled";
import {position, border} from "styled-system";
import {Box as box} from "rebass";

const NBox = styled(box)(position, border);
export const Box = props => <NBox {...props} />;
