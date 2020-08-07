import styled from 'styled-components/native';

export const Container = styled.View`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  height: 46px;
  padding: 0 15px;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0, 0, 0, 0.5)',
})`
  flex: 1;
  color: #000000;
  font-size: 15px;
  margin-left: 10px;
  text-align: center;
`;

