import styled from "@emotion/styled";

export const MenuWrapper = styled.div`
    height: 8vh;
    width: 100%;
    border: 1px solid red;
`;

export const Menus = styled.div<{ logInfo: boolean }>`
    margin-left: 15px;
    cursor: pointer;
    display: ${(props)=> (props.logInfo ? "inline-block" : "none")};
`;