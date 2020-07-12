import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${(theme: any) => theme.theme.body};
    color: ${(theme: any) => theme.theme.text};
    font-family: 'Inconsolata', monospace;
  }

  thead[class*="ant-table-thead"] th {
    background-color: ${(theme: any) => theme.theme.headerBackground};
    color: ${(theme: any) => theme.theme.text};
  }


    .ant-modal-header {
      background-color: ${(theme: any) => theme.theme.headerBackground};
        border-bottom: ${(theme: any) => theme.theme.borderBottom};
    }
    .ant-modal-body {
      background-color: ${(theme: any) => theme.theme.headerBackground};
       .text-display {
        color: ${(theme: any) => theme.theme.text};
       }
    }
    .ant-modal-footer {
      background-color: ${(theme: any) => theme.theme.headerBackground};
      border-top: ${(theme: any) => theme.theme.borderBottom}; 
    }


    .ant-modal-title{
      color: ${(theme: any) => theme.theme.text};
    }
    .ant-modal-close-x{
      color: ${(theme: any) => theme.theme.text};
    }


     .ant-pagination-item-active {
      background-color: ${(theme: any) => theme.theme.headerBackground};
        border-color: ${(theme: any) => theme.theme.borderColor};
        a{
          color: ${(theme: any) => theme.theme.text};
        }
    }

     .ant-pagination-disabled {
      background: ${(theme: any) => theme.theme.headerBackground};
        border-color: ${(theme: any) => theme.theme.borderColor};
    }
  
  `;
