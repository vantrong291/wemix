package com.wemix;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // import this

import android.os.Build;
import android.os.Bundle; // import this
import android.content.Intent;
import android.support.annotation.RequiresApi;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;
import android.app.NotificationManager;
import android.view.View;
import android.content.Context;
import android.app.PendingIntent;
import android.app.Notification;



public class MainActivity extends ReactActivity {


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "WeMix";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
         super.onActivityResult(requestCode, resultCode, data);
         MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }


}
