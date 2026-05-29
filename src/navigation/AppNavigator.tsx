import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthGuard } from '../auth/guards/AuthGuard';
import { LoginScreen } from '../auth/screens/LoginScreen';
import { DashboardScreen } from '../telemetry/screens/DashboardScreen';

const Stack = createNativeStackNavigator();

function ProtectedDashboard(props: any) {
  return (
    <AuthGuard>
      <DashboardScreen {...props} />
    </AuthGuard>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={ProtectedDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
