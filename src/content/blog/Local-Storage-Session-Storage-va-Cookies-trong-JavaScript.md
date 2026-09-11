---
title: "Local Storage, Session Storage và Cookies trong JavaScript"
description: "JavaScript cung cấp cho chúng ta ba cơ chế để lưu trữ các thông tin này: Local Storage, Session Storage và Cookies. Ở bài viết này, mình sẽ giới thiệu cho các bạn về ba cơ chế này cũng như sự khác biệt giữa chúng nhé."
slug: "Local-Storage-Session-Storage-va-Cookies-trong-JavaScript"
pubDate: 2024-01-30T04:55:09.290Z
updatedDate: 2024-01-30T04:55:09.290Z
heroImage: "./Local-Storage-Session-Storage-va-Cookies-trong-JavaScript-hero.png"
tags: ["javaScript"]
categories: ["code"]
legacyId: "65b8812d2e955bb448f29644"
---

Khi sử dụng JavaScript lập trình web, chúng ta nhiều khi gặp một số trường hợp cần lưu trữ thông tin phía client như thông tin người dùng, theme của trang web, hay một số thông tin hữu dụng khác trong quá trình người dùng thao tác với website. JavaScript cung cấp cho chúng ta ba cơ chế để lưu trữ các thông tin này: **Local Storage, Session Storage và Cookies.** Ở bài viết này, mình sẽ giới thiệu cho các bạn về ba cơ chế này cũng như sự khác biệt giữa chúng nhé.

## Local Storage

Local Storage có thể lưu trữ thông tin giữa các session khác nhau, session ở đây có nghĩa là phiên làm việc của website, dữ liệu đã lưu vào local storage sẽ không bị xóa đi sau khi session kết thúc (có thể hiểu là khi bạn đóng website). Với tính chất này, local storage thường được sử dụng để lưu các settings, user preferences của một website.

Phương thức lưu trữ này có thể lưu đến 10MB dữ liệu, lớn nhất trong 3 loại nhưng có một nhược điểm đó là local storage chỉ có thể lưu được kiểu dữ liệu chuỗi (String).

**Cách lưu và đọc của Local Storage:**

```js
// Lưu dữ liệu vào Local Storage
localStorage.setItem('name', 'koalalikecode');

// Đọc dữ liệu từ Local Storage
const name = localStorage.getItem('name');
console.log(name); // In ra: koalalikecode
```

**Xóa Local Storage:**

```js
// Xóa một biến
localStorage.removeItem(key);

// Xóa toàn bộ trong Local Storage
localStorage.clear();
```

## Session Storage

Session Storage gần như giống hệt Local Storage trừ một điểm là dữ liệu lưu trữ bởi Session Storage sẽ bị xóa sau khi phiên làm dịch của website kết thúc, tức là khi người dùng đóng tab trên trình duyệt.

Cũng từ lý do như trên, mỗi lần chúng ta bật một tab mới là sẽ xuất hiện một session mới ứng với tab đó, vì vậy có thể cùng một trang web nhưng 2 tab khác nhau thì dữ liệu trong session storage cũng sẽ khác nhau.

Session Storage thường ứng dụng để lưu các dữ liệu chỉ tồn tại ở phiên làm việc đó, chẳng hạn như thông tin phiên làm việc của người dùng, hay một số web cần check vị trí của người dùng.

**Cách lưu và đọc của Session Storage**

```js
// Lưu dữ liệu vào Session Storage
sessionStorage.setItem('name', 'koalalikecode');

// Đọc dữ liệu từ Session
const name = sessionStorage.getItem('name');
console.log(name); // Output: koalalikecode
```

**Xóa Session Storage:**

```js
// Xóa một biến
sessionStorage.removeItem(key);

// Xóa toàn bộ trong Session Storage
sessionStorage.clear();
```

## Cookies 🍪🍪🍪

Cookies là các dữ liệu do người dùng tạo ra trong quá trình sử dụng trang web và được lưu ở local machine. Cơ chế này giúp nâng cao trải nghiệm sử dụng web thông qua việc lưu một số thông tin hữu ích như thông tin đăng nhập của người dùng, ngôn ngữ duyệt web,…

Khác với Local Storage và Session Storage chỉ access được dữ liệu ở phía client, cookies cho phép chúng ta access được cả ở client và server (khi tạo một http request thì cookies của browser sẽ được attach vào header Cookie, từ đó phía server có thể parse header này và get được data cookie).

Cookies cho phép lưu trữ tối đa khoảng 4KB và khác với local storage, nó cho phép lưu trữ cả các kiểu dữ liệu khác ngoài chuỗi (có thể là array, object,…). Ngoài ra, cookies có thời gian expire cụ thể, có thể là do lập trình viên cung cấp.

**Cách tạo cookies và đọc cookies**

```js
// Tạo cookies 
document.cookie = 'username=koalalikecode; expires=Fri, 21 Apr 2023 8:00:00 UTC';

// Đọc cookies
let x = document.cookie;
```

Ở ví dụ trên, ta có thể thấy, ngoài giá trị key-value `username`, ta còn có thể cung cấp thời hạn cookies kết thúc bằng `expires` key và value là một thời gian cụ thể. Khi đọc cookies, `document.cookie` sẽ trả lại tất cả cookie trong một chuỗi tring kiểu như: `cookie1 = giá trị; cookie2 = giá trị; cookie3 = giá trị;`

## Bảng so sánh
|Local Storage|Session Storage|Cookies|
|---|---|---|
|Dung lượng lưu trữ 5MB/10MB|Dung lượng lưu trữ 5MB|Dung lượng lưu trữ 4KB|
|Vô thời hạn, chỉ có thể xóa bằng javascript hoặc thủ công|Chỉ tồn tại trong phạm vị session, tab trình duyệt|Cookies hết hạn dựa trên thiết lập ban đầu|
|Chỉ có thể đọc được ở phía client|Chỉ có thể đọc được ở phía client|Có thể đọc được ở cả client và server|
|Không có dữ liệu truyền về server|Không có dữ liệu truyền về server|Có tồn tại dữ liệu truyền về server|
