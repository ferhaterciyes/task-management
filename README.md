# Görev Yönetim Uygulaması

Bu uygulama, ekip içinde görevlerin takip edilmesini sağlayan basit bir görev yönetim uygulamasıdır. Kullanıcılar görev oluşturabilir, güncelleyebilir, silebilir ve görev durumunu değiştirebilir.

## Özellikler

- **Kullanıcı Yönetimi**
  - TC Kimlik No doğrulaması ile kayıt ve giriş
  - Kullanıcı rolleri (Normal kullanıcı / Admin)

- **Görev Yönetimi**
  - Görev oluşturma
  - Görev düzenleme
  - Görev silme
  - Görevi tamamlandı olarak işaretleme

- **Yetkilendirme**
  - Normal kullanıcılar sadece kendi görevlerini görüntüleyebilir ve düzenleyebilir
  - Yönetici kullanıcılar tüm görevleri görüntüleyebilir ve düzenleyebilir

- **Responsive Tasarım**
  - Desktop ve mobil cihazlara uygun arayüz

## Teknolojiler

- **Frontend**
  - React 19
  - TypeScript
  - React Router v7
  - React Hook Form
  - Zod (Doğrulama)
  - TailwindCSS (Stil)
  - React Icons
  
- **Backend**
  - Firebase Authentication (Kullanıcı yönetimi)
  - Firebase Firestore (Veritabanı)

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

4. Uygulamayı çalıştırın:
```bash
npm run dev
```

## Canlı Demo

Uygulamanın canlı demosuna [buradan](https://taskmanagementrakamon.netlify.app/) ulaşabilirsiniz.
  
## Kullanım

1. Kayıt Ol sayfasından bir hesap oluşturun (geçerli bir TC Kimlik No gereklidir)
2. Giriş yapın
3. Dashboard üzerinden görevlerinizi yönetin
   - Görev oluşturmak için "Yeni Görev" butonuna tıklayın
   - Görev detaylarını görüntülemek için karta tıklayın
   - Görevleri filtreleyin (Tümü, Tamamlanmadı, Tamamlandı)

## Admin Kullanıcısı Oluşturma

Admin kullanıcısı oluşturmak için Firebase Firestore veritabanındaki kullanıcılar koleksiyonundan ilgili kullanıcının "role" alanını "admin" olarak güncelleyin.

### Test İçin Admin Kullanıcısı

Firebase koleksiyonunu açıp kurulum yapmak istemiyorsanız, aşağıdaki admin kullanıcı bilgilerini kullanarak uygulamayı test edebilirsiniz:

- **Email**: `feerciyes123@gmail.com`
- **Password**: `123123`

TC Kimlik numarasını test etmek için WhatsApp üzerinden iletişime geçebilirsiniz.
## Lisans

MIT
