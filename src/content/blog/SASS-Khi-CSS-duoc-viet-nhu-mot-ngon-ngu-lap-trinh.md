---
title: "SASS: Khi CSS được viết như một ngôn ngữ lập trình"
description: "CSS là một ngôn ngữ không thể thiếu trong lập trình web, với những dự án lớn và phức tạp về mặt giao diện, code CSS có thể trở nên dài dòng, phức tạp và khó bảo trì. Chính vì vậy, chúng ta cần đến sự trợ giúp của CSS Preprocessor, và một trong những ngôn ngữ được ưa chuộng nhất là SASS."
slug: "SASS-Khi-CSS-duoc-viet-nhu-mot-ngon-ngu-lap-trinh"
pubDate: 2022-10-04T07:51:40.494Z
updatedDate: 2022-10-04T07:51:40.494Z
heroImage: "../../assets/blog/SASS-Khi-CSS-duoc-viet-nhu-mot-ngon-ngu-lap-trinh-hero.png"
tags: ["css", "frontend"]
categories: ["code"]
legacyId: "633be60c5134e07159d8deb9"
---

CSS là một ngôn ngữ không thể thiếu trong lập trình web, với những dự án lớn và phức tạp về mặt giao diện, code CSS có thể trở nên dài dòng, phức tạp và khó bảo trì. Chính vì vậy, chúng ta cần đến sự trợ giúp của CSS Preprocessor, và một trong những ngôn ngữ được ưa chuộng nhất là SASS.

## CSS Preprocessor là gì?

CSS Preprocessors là ngôn ngữ tiền xử lý CSS, là một chương trình giúp biên dịch những cú pháp đặc trưng của ngôn ngữ tiền xử lý thành cú pháp CSS thông thường. CSS Preprocessor sẽ có thêm một số tính năng và cách viết giúp bạn tiết kiệm thời gian viết CSS, dễ dàng bảo trì và phát triển CSS hơn. Có rất nhiều loại CSS Preprocessor trong đó bao gồm SASS, Stylus hay LESS.

## Giới thiệu về SASS

SASS là một chương trình tiền xử lý CSS (*CSS preprocessor*). So với CSS thuần thì SASS có thêm một số tính năng như `nesting, mixins, inheritance` và một số thư viện hỗ trợ đi kèm giúp bạn viết CSS nhanh hơn, dễ dàng hơn và đặc biệt là có cú pháp giống một ngôn ngữ lập trình hơn.

Để bắt đầu với SASS, bạn có thể cài đặt package vào dự án với npm:

```bash
npm install sass
```

Sau khi SASS được cài đặt, bạn có thể biên dịch SASS thành CSS bằng câu lệnh `sass`. Câu lệnh này yêu cầu 2 đối số là file nguồn và file đích, tức là file sass để biên dịch và file css nó biên dịch thành. Chẳng hạn, trong folder `styles` mình có 2 file là `input.scss` và `output.css` thì khi chạy `sass input.scss output.css`, chương trình sẽ lấy `input.scss` và biên dịch lại thành `output.css`.

Nhưng mỗi khi có sự thay đổi trong file scss, bạn cần gõ lại lệnh trên để cập nhật thay đổi với file css, thao tác này có thể hơi mất thời gian và dễ quên. Chính vì vậy, chúng ta có thể bổ sung thêm --watch flag vào câu lệnh để lắng nghe sự thay đổi, mỗi lần file scss được thay đổi và lưu lại, tự động SASS sẽ biên dịch lại file css.

```bash
sass --watch input.scss output.css
```

> 💡 **Fun fact:** SASS có hai cú pháp! Cú pháp thứ nhất là SCSS (.scss) được sử dụng phổ biến hơn. Vì nó như một phiên bản nâng cấp của CSS, mọi cú pháp hợp lệ trong CSS đều hợp lệ trong SCSS. Cú pháp thụt lề (.sass) được sử dụng ít hơn: nó sử dụng thụt lề thay vì dấu ngoặc nhọn `{}` để bao các câu lệnh và dấu xuống dòng thay cho chấm phẩy `;` để phân tách chúng. Các ví dụ trong bài viết này mình sẽ dùng cú pháp SCSS cho quen thuộc và dễ làm quen hơn.
>

## Các tính năng cơ bản trong SASS

### Variables

Trong file scss, chúng ta có thể đặt biến và sử dụng lại biến nhiều lần trong file. Điều này rất hữu dụng, vì đôi khi có nhiều nơi bạn muốn dùng chung một style hoặc muốn thay đổi style nhiều nơi một lúc thì bạn chỉ cần thay đổi giá trị của biến. Biến có thể chứa giá trị của `colors`, các `font style` hay nhiều giá trị CSS khác mà bạn muốn sử dụng lại nhiều lần. Để sử dụng biến, bạn thêm `$` trước tên biến và khai báo giá trị cho nó:

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

### Nesting

Khi viết HTML, bạn có thể thấy rằng cấu trúc code được tổ chức một cách rõ ràng, mạch lạc, các thành phần được phân cấp và lồng vào nhau. CSS được tạo ra để đi cùng với HTML, các thành phần trong CSS cũng đại diện cho các thành phần trong trang HTML tương ứng. Chính vì vậy, SASS cho phép người dùng lồng các CSS selectors lại với nhau để nó có cấu trúc rõ ràng và được phân cấp như HTML.

```scss
// input.scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

```css
/* output.css */
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

Các bạn có thể thấy `ul`, `li` và `a` selectors được lồng vào trong nav selector. Điều này giúp tổ chức lại code CSS và khiến nó dễ đọc hơn. Nhưng bạn cũng cần lưu ý rằng, việc lạm dụng quy tắc lồng nhau có thể dẫn đến CSS trở nên thừa điều kiện và sẽ khó bảo trì sau này.

### Modules

SASS hỗ trợ modules, bạn có thể tách nhỏ các file scss và kết hợp lại trong một file với cú pháp `@use`. Các file thành phần được đặt tên với kí tự gạch dưới đằng trước (ví dụ `_partial.scss`), điều này đảm bảo SASS biết rằng các file này là thành phần nhỏ và không cần biên dịch ra CSS tương ứng. Ví dụ với modules:

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```scss
// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

Như ví dụ trên ta có thể thấy modules không chỉ thêm các styles từ file `_base.scss` vào file `styles.scss` mà còn thêm các biến, chúng ta có thể sử dụng biến bằng tên file (`base.$primary-color`).

> ❗ **Lưu ý:** Chúng ta sử dụng `@use '[tên file]'`, tên file không có dấu gạch chân đằng trước và không cần thêm đuôi file (.scss). Sass sẽ biết điều đấy và thực hiện cho chúng ta.

### Mixins

Như mình đã nói ở trên, Sass cho phép bạn viết CSS giống một ngôn ngữ lập trình hơn và Mixins là một tính năng thể hiện điều đấy. Mixins cho phép bạn tạo một nhóm các câu lệnh CSS và sử dụng nó ở mọi nơi như một biến vậy. Tính chất này khiến mình cảm thấy nó giống một hàm và bạn cũng hoàn toàn có thể truyền tham số vào Mixins. Đây là ví dụ về mixin theme:

```scss
// input.scss
@mixin theme($color, $background) {
  background: $background;
  color: $color;
}

.info {
  @include theme(#fff, blue);
}
.warning {
  @include theme(#000, yellow);
}
.success {
  @include theme(#fff, green);
}
```

```css
/* output.css */
.info {
  background: blue;
  color: #fff;
}

.warning {
  background: yellow;
  color: #000;
}

.success {
  background: green;
  color: #fff;
}
```

Để khai báo một mixin, bạn sử dụng cú pháp `@mixin` và đặt tên cho nó, như mình đặt tên cho mixin ví dụ trên là `theme`. Bạn cũng có thể truyền vào các tham số ở trong dấu ngoặc đơn, ở trên là `$background` và `$color`. Cuối cùng, bạn dùng cú pháp `@include` theo sau là tên mixin và các đối số ở trong thành phần bất kì để sử dụng mixin đã tạo.

### Extend/Inheritance

Trong Sass, một CSS selector có thể kế thừa styles từ một CSS selector khác nhờ sử dụng cú pháp `@extend`.

```scss
// input.scss
.btn {
    border-radius: 1rem;
    border: none;
    color: #fff;
}

.success {
    @extend .btn;
    background: green;
}

.danger {
    @extend .btn;
    background: red;
}
```

```css
/* output.css */
.btn, .success, .danger {
    border-radius: 1rem;
    border: none;
    color: #fff;
}

.success {
    background: green;
}

.danger {
    background: red;
}
```

Trong ví dụ trên, khi biên dịch ra file `output.css`, ta có thể thấy class `.success` và `.danger` đều có các thuộc tính CSS giống class `.btn` và thêm các thuộc tính đặc trưng của riêng nó. Tính năng này giúp bạn có thể hạn chế việc thêm nhiều class vào một thẻ HTML.

### Operators

Với Sass bạn có thể dễ dàng thực hiện tính toán trong CSS, Sass hỗ trợ các toán tử cơ bản như `+, -, *, math.div() và %`. Trong ví dụ dưới, mình sẽ thực hiện tính toán cơ bản chiều rộng của 2 phần tử trong 1 thẻ cha.

```scss
@use "sass:math";

.container {
  display: flex;
}

.item-1 {
  width: math.div(600px, 960px) * 100%;
}

.item-2 {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```

## Tạm kết

Qua bài viết trên, các bạn có thể thấy Sass là một trình tiền xử lý CSS vô cùng mạnh mẽ, nó không chỉ giúp bạn tiết kiệm thời gian khi viết CSS mà còn cấu trúc lại code rõ ràng, mạch lạc, trở nên dễ đọc và dễ bảo trì. Những tính năng mình nói đến bên trên mới chỉ là một phần ưu điểm của Sass hay rất nhiều CSS Preprocessors khác, các bạn có thể tìm hiểu nhiều hơn những tính năng khác trên trang web của [Sass](https://sass-lang.com/) hoặc mình sẽ bàn luận sâu hơn trong những bài viết khác nhé. Cảm ơn các bạn đã theo dõi.
