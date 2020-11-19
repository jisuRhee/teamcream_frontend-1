import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SearchBar from '../components/SearchBar';
import useRecipes from '../hooks/useRecipes';
import RecipeList from '../components/RecipeList';
import BottomMenu from '../components/BottomMenu2';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useRecipes();

  const filterResultsByPrice = (price) => {
    // price === $ $$ $$$
    return results.filter((result) => {
      return result.price === price;
    });
  };
  return (
    // <SearchBar
    //   term={term}
    //   onTermChange={(newTerm) => setTerm(newTerm)}
    //   onTermSubmit={() => searchApi(term)}
    // />
    <View style={styles.container}>
      <View style={styles.marginTop}>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <ScrollView>
          <RecipeList title="Welcome Back!" results={filterResultsByPrice('$')} />
          <RecipeList title="Continue where you left off!" results={filterResultsByPrice('$$')} />
          <RecipeList title="What you can make right now!" results={filterResultsByPrice('$$$')} />
          <RecipeList title="Popular!" results={filterResultsByPrice('$$$')} />
        </ScrollView>
      </View>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
    paddingBottom: height * 0.07,
  },
  marginTop: {
    marginTop: 50,
  },
});

export default HomeScreen;
