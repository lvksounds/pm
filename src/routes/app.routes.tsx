import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Dashboard } from "../pages/Dashboard";
import { ListExpenses } from "../pages/Lista";
import { SearchExpenses } from "../pages/SearchExpenses";

type AppRoutes = {
  Cadastro: undefined;
  Lista: undefined;
  Search: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Cadastro" component={Dashboard} />

      <Screen name="Lista" component={ListExpenses} />

      <Screen name="Search" component={SearchExpenses} />
    </Navigator>
  );
}
