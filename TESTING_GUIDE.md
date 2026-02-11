# 🧪 FlexoLearn - Quick Start & Testing Guide

## 🚀 Getting Started

### Step 1: Open the Home Page

1. Open `index.html` in your browser
2. You'll see the FlexoLearn home page
3. Notice "🔐 Login" link in the navbar (top right)

### Step 2: Click "Start Learning"

1. Click the large "Start Learning" button in the hero section
2. You'll be redirected to the login page

### Step 3: Login or Continue as Guest

Choose one of these options:

**Option A - Login with Credentials:**

- Email: `test@email.com` (any valid email format)
- Password: `password123` (any password)
- Click "Login to FlexoLearn"

**Option B - Guest Login:**

- Click "Continue as Guest" button
- No credentials needed

### Step 4: Payment Page

You'll see the payment page with:

- Order summary (₹3,498)
- Three payment methods

**Choose a Payment Method:**

1. **Net Banking** - Select a bank and click Pay
2. **UPI Payment** - Enter UPI ID and click Pay
3. **QR Code Scan** - Click Pay to simulate scan

### Step 5: Payment Success

After clicking "Complete Payment":

- Payment is processed
- You're redirected to home page
- Profile button now appears in navbar

### Step 6: Access Your Purchases

1. Click "👤 Profile" button in navbar
2. Select "📚 My Purchases"
3. Your course dashboard loads

### Step 7: Start Learning

1. Browse available courses
2. Click any course's "Start Learning" button
3. Learning modal opens with course content
4. Navigate through modules using Previous/Next buttons

### Step 8: Logout

1. Click "👤 Profile" button
2. Click "🚪 Logout"
3. Confirms logout and redirects to home
4. Login button reappears in navbar

## 📝 Test Cases

### Authentication Tests

**Test 1: Login Flow**

```
1. Open index.html
2. Click "Start Learning"
3. Enter email and password
4. Click Login
✓ Should redirect to payment page
✓ User data stored in localStorage
```

**Test 2: Guest Login**

```
1. Open login.html
2. Click "Continue as Guest"
✓ Should redirect to payment page
✓ Guest user created in localStorage
```

**Test 3: Payment Methods**

```
1. On payment page
2. Try each payment method:
   - Net Banking (select bank)
   - UPI (enter UPI ID)
   - QR Code (default)
3. Click "Complete Payment"
✓ All methods should work
✓ Payment status saved
```

**Test 4: Profile Menu**

```
1. After payment, click Profile button
2. Menu should show:
   - 📚 My Purchases
   - 🚪 Logout
✓ Menu toggles on click
✓ Both options work
```

**Test 5: Logout**

```
1. Click Profile → Logout
2. Confirm logout
✓ localStorage cleared
✓ Redirects to home
✓ Login button reappears
```

### Course Tests

**Test 6: Course Loading**

```
1. Go to My Purchases
2. View courses in tabs:
   - All Courses
   - Basic (7)
   - Advanced (4)
✓ Correct course counts
✓ Tab switching works
✓ All courses display
```

**Test 7: Learning Module**

```
1. Click course "Start Learning"
2. Modal opens with content
3. Click module in sidebar
4. Use Previous/Next buttons
5. Check progress bar
✓ Modal displays
✓ Navigation works
✓ Progress updates
```

**Test 8: Close Learning**

```
1. In learning modal
2. Click "Close Course"
3. Or click X button
✓ Modal closes
✓ Returns to courses list
```

## 🔍 Debugging Tips

### Check localStorage Data

Open browser console (F12) and run:

```javascript
// View user data
console.log(JSON.parse(localStorage.getItem("flexoUser")));

// Check payment status
const user = JSON.parse(localStorage.getItem("flexoUser"));
console.log(user.paymentStatus);

// Clear all data
localStorage.clear();
```

### Common Issues

**Issue: Profile button not showing**

- Solution: Complete payment first
- Check: `paymentStatus === 'completed'`

**Issue: Can't see courses**

- Solution: Login and complete payment
- Check localStorage for user data

**Issue: Learning modal not opening**

- Solution: Make sure course data is loaded
- Check: courses object in script.js

**Issue: Not redirecting to payment**

- Solution: Check email validation
- Try: Different email format

## 🎯 Test Credentials

Feel free to use any credentials:

- Email: `test@flexolearn.com`
- Email: `yourname@example.com`
- Email: `student123@college.edu`
- Password: Can be anything (e.g., `password`, `123456`, etc.)

## 📊 Testing Checklist

### Navigation

- [ ] Home page loads correctly
- [ ] All navbar links work
- [ ] Login link shows initially
- [ ] Profile button shows after payment

### Authentication

- [ ] Can login with email/password
- [ ] Can use guest login
- [ ] Data saved to localStorage
- [ ] Logout clears data
- [ ] Can't access purchases without payment

### Payment

- [ ] All 3 payment methods visible
- [ ] Can select each method
- [ ] Details form appears based on method
- [ ] Payment processes successfully
- [ ] Order summary displays correctly

### Courses

- [ ] All 11 courses load
- [ ] Tabs work (All/Basic/Advanced)
- [ ] Course count accurate
- [ ] Progress bars show

### Learning

- [ ] Modal opens for courses
- [ ] Modules display correctly
- [ ] Navigation buttons work
- [ ] Progress updates
- [ ] Can complete course
- [ ] Modal closes properly

### Responsive

- [ ] Works on desktop (1200px+)
- [ ] Works on tablet (768px-1199px)
- [ ] Works on mobile (< 768px)
- [ ] All buttons accessible on mobile

## 🎨 Customization Ideas

### Colors

Edit CSS variables in styles.css:

```css
:root {
  --primary-color: #2563eb; /* Change primary color */
  --secondary-color: #1e40af; /* Change secondary */
  --accent-color: #f59e0b; /* Change accent */
}
```

### Payment Amount

Edit payment.html:

```html
<span class="price">₹2,999</span>
<!-- Change price -->
<span class="total-price">₹3,498</span>
<!-- Change total -->
```

### Banks List

Edit payment.html:

```html
<option value="hdfc">HDFC Bank</option>
<!-- Add/remove banks -->
```

### Course Count

Edit my-purchases.html:

```javascript
<div class="stat-number">11</div>  <!-- Update count -->
```

## 📱 Device Testing

### Desktop

- Open on 1920x1080 display
- Test all interactive elements
- Check multi-column layouts

### Tablet

- Test on iPad or tablet-sized viewport (768px width)
- Check touch responsiveness
- Verify dropdown menus

### Mobile

- Test on iPhone or mobile viewport (375px width)
- Check single-column layouts
- Verify buttons are touchable

## 🐛 Browser Testing

Works on:

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 📞 Support

If something doesn't work:

1. Clear browser cache
2. Check console for errors (F12)
3. Verify localStorage has data
4. Try logging out and logging back in
5. Check file paths are correct

## ✨ Next Steps

After testing, you can:

1. Deploy to a web server
2. Connect real payment gateway
3. Add email verification
4. Add certificate generation
5. Add user forums
6. Add video content
7. Add live chat support
8. Add analytics tracking

---

**Happy Testing!** 🎉

For any issues, check the browser console for error messages and verify all files are in the same directory.
