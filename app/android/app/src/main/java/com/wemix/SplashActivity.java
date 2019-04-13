package com.wemix;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

//        this.notiButtonClicked();


        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
//    public void notiButtonClicked()  {
//
////        // --------------------------
////        // Chuẩn bị một thông báo
////        // --------------------------
////
////        this.notBuilder.setSmallIcon(R.mipmap.ic_launcher);
////        this.notBuilder.setTicker("This is a ticker");
////
////        // Sét đặt thời điểm sự kiện xẩy ra.
////        // Các thông báo trên Panel được sắp xếp bởi thời gian này.
////        this.notBuilder.setWhen(System.currentTimeMillis()+ 10* 1000);
////        this.notBuilder.setContentTitle("This is title");
////        this.notBuilder.setContentText("This is content text ....");
////
////        // Tạo một Intent
////        Intent intent = new Intent(this, MainActivity.class);
////
////
////        // PendingIntent.getActivity(..) sẽ start mới một Activity và trả về
////        // đối tượng PendingIntent.
////        // Nó cũng tương đương với gọi Context.startActivity(Intent).
////        PendingIntent pendingIntent = PendingIntent.getActivity(this, MY_REQUEST_CODE,
////                intent, PendingIntent.FLAG_UPDATE_CURRENT);
////
////
////        this.notBuilder.setContentIntent(pendingIntent);
////
////        // Lấy ra dịch vụ thông báo (Một dịch vụ có sẵn của hệ thống).
////        NotificationManager notificationService  =
////                (NotificationManager)this.getSystemService(Context.NOTIFICATION_SERVICE);
////
////        // Xây dựng thông báo và gửi nó lên hệ thống.
////
////        Notification notification =  notBuilder.build();
////        notificationService.notify(MY_NOTIFICATION_ID, notification);
//
//        NotificationCompat.Builder builder =
//                new NotificationCompat.Builder(this)
//                        .setSmallIcon(R.mipmap.ic_launcher)
//                        .setContentTitle("Notifications Example")
//                        .setContentText("This is a test notification");
//
//        Intent notificationIntent = new Intent(this, MainActivity.class);
//        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent,
//                PendingIntent.FLAG_UPDATE_CURRENT);
//        builder.setContentIntent(contentIntent);
//
//        // Add as notification
//        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//        manager.notify(0, builder.build());
//
//    }
}

