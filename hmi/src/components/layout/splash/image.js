import styled from "@emotion/styled";
import {Flex} from "./flex";

export const Image = styled(Flex)({label: "common--image"});

Image.defaultProps = {
    as: "img",
    draggable: false
};

