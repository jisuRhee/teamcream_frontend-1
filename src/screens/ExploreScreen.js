import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import TopMenu from '../components/TopMenu';
import BottomMenu from '../components/BottomMenu';
import useRecipes from '../hooks/useRecipes';
import axiosWithToken from '../api/axiosWithToken';
import useExplore from '../hooks/useExplore';
import ProfileModal from '../components/ProfileModal';

const { width, height } = Dimensions.get('window');

const ExploreScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Filtering
  const [veryHealthy, setVeryHealthy] = useState(false);
  const [cheap, setCheap] = useState(false);
  const [veryPopular, setVeryPopular] = useState(false);
  const [sustainable, setSustainable] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [proflileModalVisible, setProfileModalVisible] = useState(false);

  const [exploreSearch, searchResults, errMsg, loading] = useExplore();

  const filterOptions = (results) => {
    setModalVisible(true);
    return results;
  };

  return (
    <View style={styles.container}>
      <TopMenu
        // title="Home"
        profileIcon
        onProfilePress={setProfileModalVisible}
        searchbar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => exploreSearch(term, veryHealthy, veryPopular, inventory, cheap)}
        onFilterSubmit={() => filterOptions()}
      />
      <View>
        <View style={{ ...styles.centeredView, marginTop: 0 }}>
          {proflileModalVisible === true ? (
            <ProfileModal isVisible={setProfileModalVisible} />
          ) : null}
          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.header}>Filter by: </Text>

                <View style={{ ...styles.row, marginBottom: 10 }}>
                  <View style={styles.boolText}>
                    <Text>Inventory:</Text>
                  </View>
                  <Checkbox
                    title="Inventory"
                    status={inventory ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setInventory(!inventory);
                    }}
                  />
                </View>
                <Text style={styles.header}>Additional options: </Text>
                <View style={styles.row}>
                  <View style={styles.boolText}>
                    <Text>Healthy:</Text>
                  </View>
                  <Checkbox
                    title="veryHealthy"
                    status={veryHealthy ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setVeryHealthy(!veryHealthy);
                    }}
                  />
                </View>
                <View style={styles.row}>
                  <View style={styles.boolText}>
                    <Text>Cheap:</Text>
                  </View>
                  <Checkbox
                    title="Cheap"
                    status={cheap ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheap(!cheap);
                    }}
                  />
                </View>
                <View style={styles.row}>
                  <View style={styles.boolText}>
                    <Text>Popular:</Text>
                  </View>
                  <Checkbox
                    title="veryPopular"
                    status={veryPopular ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setVeryPopular(!veryPopular);
                    }}
                  />
                </View>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    exploreSearch(term, veryHealthy, veryPopular, inventory, cheap);
                  }}>
                  <Text style={styles.textStyle}>Save</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        {searchResults < 1 && !loading ? (
          <Text style={{ fontSize: 150 }}>Just be better.</Text>
        ) : null}
        <FlatList
          columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 2, marginLeft: 4 }}
          data={searchResults}
          numColumns={3}
          keyExtractor={(result) => result.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => navigation.navigate('RecipeScreen', { id: item._id })}>
              <View
                style={[
                  { width: width / 3 - 2 },
                  { height: width / 3 - 2 },
                  index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 },
                ]}>
                <Image
                  style={{ flex: 1, width: undefined, height: undefined }}
                  source={{ uri: item.image }}
                />
              </View>
            </TouchableOpacity>
          )}
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
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boolText: {
    justifyContent: 'center',
    width: '50%',
  },
  row: {
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  header: {
    fontWeight: 'bold',
  },
});

export default ExploreScreen;
