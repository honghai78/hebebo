package com.hehebo;

import com.facebook.react.ReactActivity;
import android.view.WindowManager;
import android.view.Window;
import android.os.Bundle;
import android.content.Intent;
import org.devio.rn.splashscreen.SplashScreen;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "hehebo";
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme);
        SplashScreen.show(this, true);
        super.onCreate(savedInstanceState);
    }
}
