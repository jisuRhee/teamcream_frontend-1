import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Autocomplete from 'react-native-autocomplete-input';

const { width, height } = Dimensions.get('window');

const AddIngredientBar = ({ data, addIngredient, save, deleteIngredient, userData }) => {
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  const filterIngred = (value) => {
    if (value) {
      const regex = new RegExp(`${value.trim()}`, 'i');
      setFilteredIngredients(data.filter((item) => item.name.search(regex) >= 0));
    } else {
      setFilteredIngredients([]);
    }
  };

  return (
    <View style={styles.backgroundStyle}>
      <Autocomplete
        containerStyle={{
          flex: 1,
          marginHorizontal: '7%',
        }}
        inputContainerStyle={{
          borderWidth: 2,
          borderColor: 'grey',
          borderRadius: 3,
        }}
        listStyle={{ maxHeight: height * 0.2, marginHorizontal: width * 0.015, zIndex: 1 }}
        data={filteredIngredients}
        defaultValue={selectedValue}
        onChangeText={(change) => {
          setSelectedValue(change);
          filterIngred(change);
        }}
        placeholder="   add your ingredient"
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 0.4,
              }}
              onPress={() => {
                if (save.includes(item.name)) {
                  const index = userData.indexOf({ name: item.name });
                  deleteIngredient(index);
                  setFilteredIngredients([]);
                  setSelectedValue('');
                } else {
                  addIngredient(item.name);
                  setFilteredIngredients([]);
                  setSelectedValue('');
                }
              }}>
              <Feather
                name={save.includes(item.name) ? 'check' : 'plus'}
                size={24}
                color={save.includes(item.name) ? 'green' : 'black'}
              />
              <Text
                style={{
                  color: save.includes(item.name) ? 'green' : 'black',
                  marginTop: 1.8,
                  marginLeft: 10,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Feather
        style={{ marginTop: height * 0.01, position: 'absolute', right: '10%', zIndex: 1 }}
        name="x"
        size={24}
        color="#000000"
        onPress={() => {
          setSelectedValue('');
          setFilteredIngredients([]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 1,
  },

  inputStyle1: {
    flex: 1,
    fontSize: 14,
    color: '#A79B9B',
  },
  iconStyle1: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#A79B9B',
    marginHorizontal: width * 0.01,
  },
});

export default AddIngredientBar;