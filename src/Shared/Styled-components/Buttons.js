import styled from 'styled-components';

const DangerButton = styled.button`
  background-color: var(--system-color);
  color: #fff;
  border: none;
  padding: 10px 11px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #72054a;
  }
`;

const PrimaryButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;


const components = { DangerButton, PrimaryButton };
export default components;