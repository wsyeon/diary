import styled from "@emotion/styled";

export const MenuWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8vh;
    width: 100%;
    border: 1px solid #d3d3d3;
    background-color: #e3e3e3;
    margin-bottom: 3rem;
    box-shadow: 1px 2px 10px 4px #999;
    div:last-child {
       margin-right: 15px; 
    }
`;

export const Menus = styled.div<{ logInfo: boolean }>`
    margin-left: 15px;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: 450;
    display: ${(props)=> (props.logInfo ? "inline-block" : "none")};
`;