import styled from 'styled-components';

export const StyledApp = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: #eee;
  border-radius: 1rem;
  width: 500px;

  @media screen and (max-width: 550px) {
    width: 300px;
  }
`;

export const StyledButtonsContainer = styled.div`
  display: flex;

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

export const StyledButton = styled.button`
  padding: 1.5rem 3rem;
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  color: white;
  font-size: 2rem;
  background-color: ${(props) => props.color || 'grey'};

  &:not(:last-child) {
    margin-right: 2rem;

    @media screen and (max-width: 550px) {
      margin-right: 0;
      margin-bottom: 2rem;
    }
  }
`;
