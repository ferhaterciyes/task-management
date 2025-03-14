# Görev Yönetim Uygulaması

Bu uygulama, ekip içinde görevlerin takip edilmesini sağlayan basit bir görev yönetim uygulamasıdır. Kullanıcılar görev oluşturabilir, güncelleyebilir, silebilir ve görev durumunu değiştirebilir.

## Özellikler

- **Kullanıcı Yönetimi**
  - TC Kimlik No doğrulaması ile kayıt ve giriş
  - Kullanıcı rolleri (Normal kullanıcı / Admin)
  - Güvenli oturum yönetimi

- **Görev Yönetimi**
  - Görev oluşturma
  - Görev düzenleme
  - Görev silme
  - Görev durumu takibi (Yapılacak / Devam Ediyor / Tamamlandı)
  - Görev bitiş tarihi belirleme
  - Görev atama

- **Yetkilendirme ve Güvenlik**
  - Normal kullanıcılar:
    - Tüm görevleri görüntüleyebilir
    - Sadece kendi görevlerini düzenleyebilir ve silebilir
    - Yeni görev oluşturabilir
  - Admin kullanıcılar:
    - Tüm görevleri görüntüleyebilir
    - Tüm görevleri düzenleyebilir ve silebilir
    - Kullanıcı rollerini yönetebilir

- **Responsive Tasarım**
  - Desktop ve mobil cihazlara uygun arayüz
  - Modern ve kullanıcı dostu tasarım
  - Kolay navigasyon

## Teknolojiler

- **Frontend**
  - React 18
  - TypeScript
  - React Router v6
  - React Hook Form
  - Zod (Form doğrulama)
  - TailwindCSS (Stil)
  - React Icons
  - Redux Toolkit (State yönetimi)
  - RTK Query (API entegrasyonu)
  
- **Backend & Veritabanı**
  - Firebase Authentication (Kullanıcı yönetimi)
  - Firebase Firestore (Veritabanı)
  - Firebase Security Rules (Güvenlik kuralları)

- **Build Tools**
  - Vite
  - TypeScript

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/ferhaterciyes/task-management.git
cd task-manager
```

2. Gerekli paketleri yükleyin:
```bash
npm install
```

3. Firebase yapılandırması:
   - [Firebase Console](https://console.firebase.google.com/)'da yeni bir proje oluşturun
   - Authentication hizmetini etkinleştirin ve Email/Password yöntemini açın
   - Firestore veritabanını oluşturun
   - Web uygulaması için proje ayarlarından yapılandırma bilgilerini alın
   - `.env.example` dosyasını `.env` olarak kopyalayın ve Firebase yapılandırma bilgilerinizi ekleyin
   - Firestore güvenlik kurallarını aşağıdaki gibi güncelleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isAdmin();
    }

    match /tasks/{taskId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin() || 
        (isAuthenticated() && resource.data.createdBy == request.auth.uid);
    }
  }
}
```

4. Uygulamayı çalıştırın:
```bash
npm run dev
```

## Canlı Demo

Uygulamanın canlı demosuna [buradan](https://taskmanagementrakamon.netlify.app/) ulaşabilirsiniz.

## Collaborators
  
The following collaborators have been added to the project:
  
- **Serenay Çiftçiler**: `serenayciftciler@rakamon.com.tr`
- **Hande Lika**: `handelika@rakamon.com.tr`

## Kullanım

1. Kayıt Ol sayfasından bir hesap oluşturun (geçerli bir TC Kimlik No gereklidir)
2. Giriş yapın
3. Dashboard üzerinden görevlerinizi yönetin:
   - Yeni görev oluşturmak için formu kullanın
   - Görevleri görüntüleyin ve yönetin
   - Görev durumlarını güncelleyin (Yapılacak / Devam Ediyor / Tamamlandı)
   - Görevleri silin (sadece kendi görevleriniz veya admin iseniz tüm görevler)

## Admin Kullanıcısı Oluşturma

Admin kullanıcısı oluşturmak için Firebase Firestore veritabanındaki kullanıcılar koleksiyonundan ilgili kullanıcının "role" alanını "admin" olarak güncelleyin.

### Test İçin Admin Kullanıcısı

Firebase koleksiyonunu açıp kurulum yapmak istemiyorsanız, aşağıdaki admin kullanıcı bilgilerini kullanarak uygulamayı test edebilirsiniz:

- **Email**: `feerciyes123@gmail.com`
- **Password**: `123123`

TC Kimlik numarasını test etmek için WhatsApp üzerinden iletişime geçebilirsiniz.

## Lisans

MIT
