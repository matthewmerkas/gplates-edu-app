import { Redirect, Route } from 'react-router-dom';
import fetchIntercept from 'fetch-intercept';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs, useIonToast,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, {useState} from "react";

interface Points {
  type: string,
  coordinates: [
      number[]
  ]
}

export interface Tab1Props {
  points?: Points,
}

export interface Tab2Props {
  loading: boolean;
  points?: Points,
  setPoints: React.Dispatch<React.SetStateAction<Points | undefined>>,
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState<Points | undefined>();
  const [present, dismiss] = useIonToast();
  const [toastId, setToastId] = useState('');

  const presentToast = async (id: string, message: string) => {
    if (toastId !== id) {
      setToastId(id);
      await present({
        buttons: [{text: 'hide', handler: () => dismiss()}],
        duration: 3000,
        message: message,
        onDidDismiss: () => setToastId(''),
      });
    }
  }

  const unregister = fetchIntercept.register({
    request: function (url, config) {
      // Modify the url or config here
      setLoading(true);
      return [url, config];
    },

    requestError: function (error) {
      // Called when an error occurred during another 'request' interceptor call
      setLoading(false);
      return presentToast('request_error', 'Request Error').then(() => {
        return Promise.reject(error);
      });
    },

    response: function (response) {
      // Modify the reponse object
      setLoading(false);
      return response;
    },

    responseError: function (error) {
      // Handle an fetch error
      setLoading(false);
      return presentToast('response_error', 'Network Error').then(() => {
        return Promise.reject(error);
      });
    }
  });

  return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 {...{points}} />
              </Route>
              <Route exact path="/tab2">
                <Tab2 {...{loading, points, setPoints}}/>
              </Route>
              <Route path="/tab3">
                <Tab3/>
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1"/>
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={triangle}/>
                <IonLabel>Tab 1</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={ellipse}/>
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={square}/>
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
  );
}

export default App;
