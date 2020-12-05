import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './src/screens/LoginScreen';
import SignUp from './src/screens/SignUpScreen';
import ForgotPassword from './src/screens/ForgotPasswordScreen';
import Home from './src/screens/HomeScreen';
import Explore from './src/screens/ExploreScreen';
import SavedRecipeScreen from './src/screens/SavedRecipeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import DietaryRestrictions from './src/screens/DietaryRestrictionsScreen';
import EmailSent from './src/screens/EmailSentScreen';
import ProfilePic from './src/screens/ProfilePicScreen';
import Inventory from './src/screens/InventoryScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {
      // screen: Home,
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Explore: {
      screen: Explore,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: 'Create Account',
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        title: 'Reset Password',
      },
    },
    DietaryRestrictions,
    EmailSent,
    ProfilePic,
    Inventory,
    SavedRecipeScreen: {
      screen: SavedRecipeScreen,
      navigationOptions: {
        title: 'Saved Recipes',
        headerShown: false,
      },
    },
    RecipeScreen: {
      screen: RecipeScreen,
      navigationOptions: {
        headerShown: true,
        title: '',
      },
    },
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'Home',
    // initialRouteName: 'SavedRecipeScreen',
    // initialRouteName: 'RecipeScreen',
    defaultNavigationOptions: {
      // title: 'Cooking with Crumbs',
      headerShown: false,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
