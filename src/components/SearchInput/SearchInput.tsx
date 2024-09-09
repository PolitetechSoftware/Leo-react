import * as React from 'react';
import styles from './SearchInput.module.css';

export interface ISearchInputProps {
  setSearchCityName: (inputValue: string) => void;
}

export default function SearchInput({ setSearchCityName }: ISearchInputProps) {
  const [inputValue, setInputValue] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchCityName(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        onKeyDown={(e) => {
          if (inputValue.length === 0 && e.key === ' ') e.preventDefault();
        }}
        placeholder="Enter city name..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}
