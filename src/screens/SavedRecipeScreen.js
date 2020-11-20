/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import SearchBar from '../components/SearchBar';
import useRecipes from '../hooks/useRecipes';
import FancyRecipeDetail from '../components/FancyRecipeDetail';
import BottomMenu from '../components/BottomMenu2';
import TopMenu from '../components/TopMenu';

const { width, height } = Dimensions.get('window');

const SavedRecipeScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useRecipes();
    return (
        <View style={styles.container}>
            <TopMenu
                title="Saved Recipes"
                searchbar
                term={term}
                onTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            <View style={styles.marginTop}>
                <FlatList
                    data={results}
                    keyExtractor={(result) => result.id}
                    renderItem={({ item }) => {
                        return (
                            // <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', { id: item.id })}>
                            <TouchableOpacity onPress={() => console.log(item.id)}>
                                <FancyRecipeDetail result={item} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
            <View style={styles.bottomMenu}>
                <BottomMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF4D1',
        paddingBottom: height * 0.17,
    },
    marginTop: {
        marginTop: 10,
    },
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
    },
});

export default SavedRecipeScreen;
