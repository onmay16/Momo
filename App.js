import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';

import LoadingScreen from './src/screens/LoadingScreen';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? (<LoadingScreen/>) : (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
};

export default App;
