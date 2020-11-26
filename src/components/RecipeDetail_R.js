import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import heartIcon from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RecipeDetail = ({ result, savedRecipeList }) => {
  const [liked, toggleLike] = useState(false);
  const [props, setProps] = useState([]);
  const AnimatedHeart = Animatable.createAnimatableComponent(heartIcon);
  let smallAnimatedIcon = AnimatedHeart;

  const handleSmallAnimatedIconRef = (ref) => {
    smallAnimatedIcon = ref;
  };

  const handleOnPressLike = () => {
    smallAnimatedIcon.bounceIn();
    if (liked === true) {
      const index = savedRecipeList.indexOf(result);
      if (index > -1) {
        savedRecipeList.splice(index, 1);
      }
    } else {
      savedRecipeList.push(result);
    }
    toggleLike(!liked);
    console.log(liked);
  };

  const {
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    veryHealthy,
    cheap,
    veryPopular,
    sustainable,
    weightWatcherSmartPoints,
    gaps,
    lowFodMap,
    aggregateLikes,
    spoonacularScore,
    healthScore,
    creditsText,
    license,
    sourceName,
    pricePerServing,
    extendedIngredients,
    id,
    title,
    readyInMinutes,
    servings,
    sourceUrl,
    image,
    imageType,
    summary,
    cuisines,
    dishTypes,
    diets,
    occasions,
    instructions,
    analyzedInstructions,
    originalId,
    spoonacularSourceUrl,
  } = result;
  // console.log('Thisis result:', result);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.recipeDescription}>
        <Text style={styles.name}>{title}</Text>
        <TouchableOpacity activeOpacity={1} onPress={handleOnPressLike}>
          <AnimatedHeart
            ref={handleSmallAnimatedIconRef}
            name={liked ? 'heart' : 'hearto'}
            color={liked ? colors.heartColor : colors.black}
            size={18}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const colors = {
  transparent: 'transparent',
  white: '#fff',
  heartColor: '#e92f3c',
  textPrimary: '#515151',
  black: '#000',
};
const styles = StyleSheet.create({
  image: {
    width: width * 0.58,
    height: height * 0.2,
    resizeMode: 'stretch',
    borderRadius: 4,
    marginBottom: 5,
  },
  recipeDescription: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width * 0.55,
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  container: {
    margin: 15,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    flexGrow: 1,
    width: width * 0.6,
  },
});

export default RecipeDetail;
