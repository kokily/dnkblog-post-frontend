import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

interface SearchProps {
  mode: string;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Search({ mode, search, onChange, onSearch, onKeyPress }: SearchProps) {
  return (
    <SearchBox>
      <Content>
        <Input
          type="text"
          name="search"
          value={search}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={`${mode}`}
        />
        <Button onClick={onSearch}>검 색</Button>
      </Content>
    </SearchBox>
  );
}

export default Search;

// Styles
const SearchBox = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 1.6rem;
  box-sizing: content-box;
  -webkit-box-sizing: content-box;
`;

const Content = styled.div`
  width: calc(100% - 60px);
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
`;

const Input = styled.input`
  width: 50px;
  height: 50px;
  background: ${oc.gray[9]};
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: white;
  font-size: 1rem;
  line-height: 1rem;
  float: left;
  padding-left: 25px;
  transition: width 0.55s ease;
  &::placeholder {
    font-size: 1rem;
    color: ${oc.gray[5]};
  }
  &:focus,
  &:active {
    outline: none;
    width: calc(100% - 60px);
  }
`;

const Button = styled.button`
  width: 60px;
  height: 50px;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  outline: none;
  background: ${oc.gray[7]};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s all;
  line-height: 1rem;
  &:hover {
    background: ${oc.gray[6]};
  }
`;
