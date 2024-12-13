<?php
include ("inc/header.php");
?>


<div id="content-wrapper">
    <div class="location-bar">
        <div class="container">
            <ul class="breadcrumb">
                <li><a href="#">Home</a></li>
                <li>/ Our Offices</li>
            </ul>
        </div>
    </div>

    <div class="contact-header">
        <div class="container">
            <h1>Our Offices</h1>
        </div>
    </div>

    <div class="offices">
        <div class="container">
            <div class="office_cards">
                <div class="office-1">
                    <img src="img/cambridge.jpeg" alt="">
                    <div class="office_content">
                        <p class="h2"><a href="#">Cambridge Office</a></p>
                        <p>Unit 1.31, <br>
                            St John Innovation Centre, <br>
                            Cowley Road Milton, <br>
                            Cambridge, <br>
                            CB4 0WS
                        </p>
                        <a href="#" class="phonenumber">01223 37 57 72</a> <br>
                        <button>View More</button>
                    </div>
                </div>
                <div class="office-2">
                    <img src="img/wymondham.jpeg" alt="">
                    <div class="office_content">
                        <p class="h2"><a href="#">Wynmondham Office</a></p>
                        <p>Unit 15, <br>
                            Penfold Drive, <br>
                            Gateway 11 Business Park, <br>
                            Wynmondham, Norfolk, <br>
                            NR18 0WZ
                        </p>
                        <a href="#" class="phonenumber">01603 70 40 20</a> <br>
                        <button>View More</button>
                    </div>
                </div>
                <div class="office-3">
                    <img src="img/yarmouth-2.jpeg" alt="">
                    <div class="office_content">
                        <p class="h2"><a href="">Great Yarmouth Office</a></p>
                        <p>Suite F23, <br>
                            Beacon Innovation Centre, <br>
                            Beacon Park, Gorleston, <br>
                            Great Yarmouth, Norfolk, <br>
                            NR31 7RA
                        </p>
                        <a href="#" class="phonenumber">01493 60 32 04</a> <br>
                        <button>View More</button>
                    </div>
                </div>
            </div>  
        </div>
    </div>


    <div class="container">
        <div class="contact-section">
            <div class="contact-details">
                <p><strong>Email us on:</strong></p>
                <p class="h3email"><a href="#">sales@netmatters.com</a></p>
                <p><strong>Business Hours:</strong></p>
                <p><strong>Monday - Friday 07:00 - 18:00</strong></p>
                <p><strong>Out of hours IT Support <span class="icon-keyboard_arrow_down" style="vertical-align: middle;"></span></strong></p>
            </div>
            <div class="contact-form">
                <div class="group-wide">
                    <div class="form-group">
                        <label for="firstname">Your Name</label>
                        <input type="text" name="firstname" id="firstname">
                    </div>
                    <div class="form-group">
                        <label for="companyname">Company Name</label>
                        <input type="text" name="companyname" id="companyname">
                    </div>
                    <div class="form-group">
                        <label for="email">Your Email</label>
                        <input type="text" name="email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="phone">Your Telephone Number</label>
                        <input type="text" name="phone" id="phone">
                    </div>

                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea name="message" id="message" placeholder="Hi, I am interested in discussing a Our Offices solution, could you please give me a call or send an email?"></textarea>
                </div>
                <div class="form-group">
                    <label for="Checkbox">
                        <div class="checkbox">
                            <input type="checkbox" id="Checkbox" style="display: none;">
                            <span class="icon-checkbox-unchecked custom-icon"></span>
                            <span>
                                Please tick this box if you wish to receive marketing information from us. 
                                Please see our <a href="">Privacy Policy</a> for more information on how we keep your data safe.
                            </span>
                        </div>
                    </label>
                </div>
                <div class="form-group captcha">
                    <span>This site is protected by reCAPTCHA and the google <a href="">Privacy Policy</a> and <a href="">Terms of Service</a> apply.</span>
                </div>
                <div class="send-form">
                    <button>send enquiry</button>
                    <small>Fields Required</small>
                </div>
            </div>
        </div>
    </div>

</div>



<?php
include ("inc/footer.php");
?>