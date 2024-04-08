window.addEventListener('message', function(event) {
    let item = event.data

    if (item.action == "Playerdata") {
        Setdata(item.data)
    } else if (item.action == "Weapon") {
        if (item.show) {
            $(".ammo_box").fadeIn()
            Ammobox(item.data)
        } else {
            $(".ammo_box").fadeOut()
        }
    } else if (item.action == "Speedo") {
        if (item.show) {
            $(".spedo-wrap").fadeIn()
            SpeedoMeter(item.data)
        } else {
            $(".spedo-wrap").fadeOut()
        }
    } else if (item.action == "Notify") {
        Notify(item.title, item.message, item.timeout)
    } else if (item.action == "Announce") {
        Announce(item.title, item.message, item.timeout)
    } else if (item.action == "Range") {
        SetVoiceRange(item.range)

    } else if (item.action == "ShowHud") {
        if (item.show) {
            $(".form").fadeIn()
        } else {
            $(".form").fadeOut()
        }
    } else if (item.action == "Scoreboard") {
        if (item.show) {
            $(".scoreboard").fadeIn();
            Scoreboard(item.jobs)
        } else {
            $(".scoreboard").fadeOut();
        }
    }
})

$(document).ready(function() {
    $("body").append(`
    <div class="form">
    <div class="blur-right"></div>
    <div class="right">
        <div class="wr_flx">
            <div class="name_project">
                <img src="assets/images/logo.png" alt="">
                <div class="row">
                    <span>overseas</span>
                    <span>roleplay</span>
                </div>
            </div>
            <div class="wr_inf">
                <div class="bx_min">
                    <img src="assets/images/users.png" alt="">
                </div>
                <div class="row_min_box_right">
                    <span>spieler:</span>
                    <span class="players">0</span>
                </div>
            </div>
            <div class="wr_inf">
                <div class="bx_min">
                    <img src="assets/images/user.png" alt="">
                </div>
                <div class="row_min_box_right">
                    <span>ID:</span>
                    <span class="source">0</span>
                </div>
            </div>
        </div>
        <div class="wr_blck_money">
            <div class="wr_mny">
                <div class="bx_big">
                    <img src="assets/images/money.png" alt="">
                </div>
                <span class="money">0 $</span>
            </div>
            <div class="wr_mny">
                <div class="bx_big">
                    <img src="assets/images/card.png" alt="">
                </div>
                <span class="account">0 $</span>
            </div>
        </div>
        <div class="microphone">
            <div class="bx_microphone_min">
                <img src="assets/images/microphone.png" alt="">
            </div>
            <div id="range" class="circle activated"></div>
            <div id="range" class="circle activated"></div>
            <div id="range" class="circle"></div>
        </div>
        <div class="ammo_box" style="display: none;">
            <div class="bx_big">
                <img src="assets/images/ammo.png" alt="">
            </div>
            <span class="ammo">0/0</span>
        </div>
    </div>
    <div class="left">
        <div class="wr_sc_lf">
            <div class="bx_min">
                <img src="assets/images/job.png" alt="">
            </div>
            <div class="row_min_box_left">
                <span>JOB:</span>
                <span class="job">UNEMPLOYED</span>
            </div>
        </div>
        <div class="wr_sc_lf">
            <div class="bx_min">
                <img src="assets/images/clock.png" alt="">
            </div>
            <div class="row_min_box_left">
                <span class="date">02.02.23</span>
                <span class="time">15:54</span>
            </div>
        </div>
    </div>
    <div class="notifys"></div>
    <div class="announce" style="display: none;"></div>
    <div class="scoreboard" style="display: none;">
        <div class="sc_hd">
            <span>scoreboard</span>
            <span>overseas</span>
        </div>
        <div class="flex_boxes">
            <div class="score_wrap">
                <div class="bx_score">
                    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3602 12.2256C14.6726 12.8997 14.0753 13.5897 14.0329 13.7588C13.985 13.9499 14.1417 14.4582 14.4463 15.0997C15.6568 17.6495 15.7656 20.3852 14.8196 24.4863C13.9665 28.1846 13.7437 32.8437 14.3205 34.922C15.4618 39.0341 18.8988 42.0751 26.9973 46.1383C27.9419 46.6123 28.843 47 28.9998 47C29.6252 47 35.2419 43.9766 37.702 42.3158C39.4767 41.1177 41.8044 38.8517 42.4965 37.6485C43.5407 35.8327 43.8734 34.6475 43.9765 32.375C44.0804 30.0878 43.8416 27.6593 43.2316 24.7996C42.6162 21.9137 42.4464 20.498 42.5546 19.1563C42.679 17.615 43.1199 15.8595 43.6177 14.924C43.9067 14.3808 44.0259 13.9948 43.9716 13.7781C43.9265 13.5982 43.3271 12.8997 42.6395 12.2256C41.2596 10.8729 41.045 10.793 40.0943 11.2789C38.9782 11.8494 37.1302 12.2892 35.5201 12.3675C33.6602 12.458 32.2005 12.2066 30.3862 11.483C29.7204 11.2173 29.0966 11 28.9998 11C28.9031 11 28.2793 11.2173 27.6135 11.483C25.7992 12.2066 24.3394 12.458 22.4796 12.3675C20.8694 12.2892 19.0215 11.8494 17.9053 11.2789C16.9547 10.793 16.7401 10.8729 15.3602 12.2256ZM29.3947 19.543C29.5519 19.6784 30.1348 20.8649 30.69 22.1797C31.2452 23.4946 31.708 24.5806 31.7184 24.5931C31.7288 24.6058 32.8682 24.7802 34.2507 24.9808C35.6331 25.1814 36.8491 25.4162 36.9529 25.5026C37.4356 25.9038 37.1743 26.342 35.3362 28.2149L33.5307 30.0547L34.2093 32.7266C34.5825 34.1961 34.8897 35.5598 34.8918 35.7571C34.8964 36.1778 34.6628 36.4532 34.3015 36.4532C34.16 36.4532 32.9429 35.8204 31.5968 35.0469C30.2507 34.2735 29.0821 33.6407 28.9998 33.6407C28.9176 33.6407 27.7349 34.2815 26.3718 35.0648C24.2327 36.2938 23.8442 36.4716 23.5338 36.3629C23.2946 36.2792 23.16 36.1161 23.1319 35.8759C23.1087 35.6773 23.4044 34.2591 23.7889 32.7242L24.4879 29.9337L22.7081 28.1237C20.9472 26.333 20.6356 25.8444 21.0396 25.5085C21.1474 25.4189 22.3666 25.1814 23.749 24.9808C25.1314 24.7802 26.2709 24.6058 26.2813 24.5931C26.2917 24.5806 26.7545 23.4946 27.3097 22.1797C28.2092 20.0495 28.6504 19.2969 28.9998 19.2969C29.0599 19.2969 29.2376 19.4076 29.3947 19.543Z" fill="white"/>
                    </svg>
                </div>
                <div class="row_score">
                    <span>LSPD:</span>
                    <span class="police">0</span>
                </div>
            </div>
            <div class="score_wrap">
                <div class="bx_score">
                    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.8099 9.74466C20.3968 11.4398 16.8764 12.9082 13.9076 13.4581C13.077 13.6118 12.3081 13.8129 12.1987 13.905C12.0445 14.0349 12 15.9231 12 22.3388C12 31.4619 12.0296 31.8155 13.0165 34.5065C13.6107 36.1268 14.5438 37.8496 15.6935 39.4488C16.8425 41.0474 19.7816 43.9554 21.5466 45.2402C23.3023 46.5181 26.2273 48.0849 27.8614 48.6222L29.0098 49L30.1582 48.6222C31.7851 48.0871 34.7227 46.5171 36.4018 45.2851C40.9687 41.9347 44.0634 37.7729 45.5081 33.0381L45.9327 31.6467L45.9837 22.8659C46.0246 15.8156 45.9939 14.0521 45.8284 13.9172C45.7149 13.8248 44.8352 13.5894 43.8734 13.3941C40.8147 12.773 37.9259 11.5679 35.3239 9.82746L34.0869 9L28.9651 9.00942L23.8432 9.01883L22.8099 9.74466ZM34.1311 12.0959C36.4456 13.6267 39.738 15.0415 42.8004 15.8213L43.476 15.9932L43.4736 23.333C43.4711 31.335 43.4561 31.5022 42.5188 33.9842C40.7745 38.6033 35.267 43.9085 30.1138 45.9334L29.0716 46.3428L28.2062 46.0386C22.9985 44.2074 17.3703 38.8191 15.4409 33.8173C14.5755 31.5739 14.5484 31.2572 14.5459 23.333L14.5435 15.9932L15.2191 15.8213C18.2898 15.0394 21.9965 13.4332 24.0022 12.015L24.7971 11.453L28.9646 11.4441L33.1323 11.4351L34.1311 12.0959ZM24.0817 13.7349C22.5605 14.7079 20.1019 15.8692 18.1577 16.5328C17.2164 16.8542 16.3402 17.1171 16.2103 17.1171C16.0054 17.1171 15.9742 17.9916 15.9742 23.7471C15.9742 29.8559 15.9994 30.4775 16.2936 31.6525C17.4644 36.3276 21.7332 41.1849 27.0064 43.8421C27.9593 44.3223 28.8691 44.7152 29.0282 44.7152C29.1875 44.7152 30.1605 44.2776 31.1905 43.7431C36.4308 41.023 40.5762 36.2687 41.7251 31.6613C42.0203 30.4775 42.0453 29.8594 42.0453 23.7471C42.0453 17.9916 42.0141 17.1171 41.8092 17.1171C41.3609 17.1171 38.164 15.9516 36.7289 15.2651C35.937 14.8862 34.7397 14.2347 34.0682 13.8173L32.8473 13.0585L28.9811 13.0662L25.115 13.0738L24.0817 13.7349ZM31.8712 22.0685V24.2601L33.8981 24.2625C35.0128 24.264 36.016 24.3242 36.1275 24.3963C36.2818 24.4963 36.3197 25.202 36.2864 27.3566L36.2429 30.1856L34.057 30.2307L31.8712 30.2758V32.4455C31.8712 34.2743 31.8316 34.6307 31.6197 34.7138C31.2921 34.8422 26.7274 34.8422 26.3998 34.7138C26.1879 34.6307 26.1483 34.2743 26.1483 32.4455V30.2758L23.9625 30.2307L21.7766 30.1856L21.7331 27.3566C21.6999 25.202 21.7377 24.4963 21.892 24.3963C22.0035 24.3242 23.0066 24.264 24.1214 24.2625L26.1483 24.2601V22.0685V19.8769H29.0098H31.8712V22.0685Z" fill="white"/>
                    </svg>
                </div>
                <div class="row_score">
                    <span>LSMD:</span>
                    <span class="ambulance">0</span>
                </div>
            </div>
            <div class="score_wrap">
                <div class="bx_score">
                    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.055 12.2052C14.7965 12.8125 12.8852 14.715 12.204 17.0337C11.9353 17.9481 11.9315 19.6765 12.1957 20.691C12.5022 21.8676 13.017 22.7204 14.0489 23.761C15.5337 25.2581 17.2102 25.9009 19.2985 25.7735C19.9195 25.7356 20.52 25.6667 20.6329 25.6205C20.7798 25.5603 22.4936 27.2002 26.6579 31.3858C31.2495 36.0006 32.457 37.2839 32.3797 37.4665C32.3259 37.5939 32.2531 38.1781 32.2179 38.7648C32.0985 40.7586 32.7628 42.4622 34.2404 43.9513C35.6397 45.3612 37.1441 45.9954 39.0975 45.9984C41.015 46.0015 42.6393 45.3329 43.9861 43.9863C45.3299 42.6426 46 41.0377 46 39.163C46 37.1055 45.4256 35.7291 43.9432 34.2342C42.4584 32.737 40.7819 32.0943 38.6936 32.2217C38.0726 32.2595 37.4711 32.3287 37.3569 32.3755C37.0433 32.5039 25.4823 20.8347 25.6145 20.5231C25.6671 20.3987 25.739 19.8171 25.7742 19.2303C25.8936 17.2366 25.2293 15.533 23.7516 14.0438C22.3319 12.6132 20.8331 11.992 18.8335 12.0055C18.249 12.0094 17.4487 12.0993 17.055 12.2052ZM37.3652 12.2457C36.1544 12.637 35.4837 13.0521 34.5438 13.9919C33.0625 15.4729 32.4894 17.0362 32.6221 19.2345L32.6943 20.43L31.51 21.6274L30.3255 22.8248L32.6851 25.1813L35.0445 27.5379L36.2183 26.3587C37.3809 25.1909 37.3968 25.1807 37.8769 25.2921C38.6372 25.4689 40.1587 25.4303 40.9927 25.2129C43.2666 24.6208 45.1111 22.81 45.7881 20.5054C46.0882 19.4835 46.0627 17.8052 45.7307 16.7303C45.5826 16.2508 45.414 15.8292 45.3562 15.7935C45.2983 15.7577 44.5677 16.417 43.7325 17.2586C42.8973 18.1002 41.9921 18.904 41.7211 19.0448C40.1035 19.8853 38.2843 18.4979 38.6233 16.6821C38.7004 16.2691 39.0235 15.8698 40.4324 14.4464C41.3757 13.4934 42.1475 12.6739 42.1475 12.6253C42.1475 12.5768 41.7527 12.4152 41.2701 12.2661C40.1474 11.9194 38.4025 11.9103 37.3652 12.2457ZM20.0303 16.3607C20.9809 16.7925 21.6865 17.8671 21.6888 18.887C21.6923 20.3197 20.3285 21.6904 18.8999 21.6904C17.427 21.6904 16.1207 20.3971 16.1131 18.9313C16.1029 16.9281 18.2203 15.5386 20.0303 16.3607ZM21.7737 31.6364C20.6112 32.8043 20.5953 32.8145 20.1152 32.703C19.3549 32.5262 17.8333 32.5649 16.9993 32.7822C14.6998 33.3811 12.8679 35.1966 12.1884 37.5502C11.876 38.6325 11.9691 40.5912 12.384 41.6624L12.6847 42.4387L14.3674 40.7739C15.293 39.8581 16.217 39.0456 16.4209 38.968C18.0564 38.3464 19.6911 39.7207 19.3686 41.4459C19.2916 41.8578 18.9718 42.2548 17.5994 43.6422C16.5647 44.6883 15.9725 45.3819 16.0504 45.4566C16.329 45.7232 17.6791 46 18.7007 46C20.6435 46 22.2537 45.305 23.5696 43.8983C24.9591 42.4133 25.4976 40.876 25.3699 38.7607L25.2978 37.5652L26.4821 36.3677L27.6665 35.1704L25.307 32.8138L22.9475 30.4573L21.7737 31.6364ZM39.926 36.4441C41.4484 36.8669 42.3046 38.7649 41.63 40.2218C40.767 42.0857 38.3535 42.4452 37.006 40.9104C36.0225 39.7905 36.0973 38.2307 37.1866 37.1399C37.9589 36.3665 38.8404 36.1427 39.926 36.4441Z" fill="white"/>
                    </svg>
                </div>
                <div class="row_score">
                    <span>LSSC:</span>
                    <span class="mechanic">0</span>
                </div>
            </div>
        </div>
    </div>
    <div class="spedo-wrap" style="display: none;">
        <div class="cc_sp_blur"></div>
        <div class="speedo">
            <svg class="progress-ring" viewBox="0 0 350 350">
                    <circle id="circle-background" r="125" cx="175" cy="175"></circle>
                    <circle id="circle-progress" r="125" cx="175" cy="175"></circle>
                    <circle id="circle-fuel-background" r="125" cx="175" cy="175"></circle>
                    <circle id="circle-fuel-progress" r="125" cx="175" cy="175"></circle>
                </svg>
            <div class="text-column">
                <span class="speed">0</span>
                <span>KM/H</span>
            </div>
            <div class="flx_bx">
                <div id="engine" class="bx_fnct">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.24184 1.35812L8.29297 2.57143L9.96875 2.61812V3.42857H13.4922V2.61224H15.2109V1.26147L13.8751 0H9.66419L8.24184 1.35812ZM6.14668 6.28571H5.34411C4.57153 6.28571 4.53209 6.29469 4.29026 6.52433L4.03906 6.76294V13.0738L4.29026 13.3124C4.53209 13.542 4.57153 13.551 5.34411 13.551H6.14668L8.72051 16H14.8136L17.9609 13.0262V6.89633L14.7366 3.83673H8.72051L6.14668 6.28571ZM11.9855 8.04433C11.7279 8.98531 11.5167 9.76302 11.5163 9.77265C11.516 9.78229 11.9095 9.80065 12.3908 9.81347L13.266 9.83673L11.4322 11.6949C10.4235 12.7167 9.5871 13.5422 9.57344 13.5292C9.55969 13.5162 9.7588 12.7352 10.0159 11.7936C10.2731 10.852 10.4836 10.0737 10.4839 10.0641C10.4841 10.0544 10.0925 10.0361 9.61348 10.0233L8.74259 10L10.5728 8.14261C11.5795 7.12106 12.4145 6.29608 12.4286 6.30939C12.4426 6.32269 12.2433 7.10343 11.9855 8.04433ZM0 7.88114V11.963L1.33581 13.2245H2.66406V11.5918H3.60938V8.2449H2.66406V6.61224H1.32799L0 7.88114ZM19.3359 8.89796H18.3906V10.9388H19.3359V12.1633H20.672L22 10.8944V8.93494L20.6642 7.67347H19.3359V8.89796Z" fill="white" fill-opacity="0.5"/>
                    </svg>
                </div>
                <div id="key" class="bx_fnct">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.125 2.125C3.00137 2.24863 3 2.33331 3 9.99756V17.7451L3.13681 17.8726C3.27206 17.9986 3.32862 18 8.19475 18H13.1159L13.2454 17.8353C13.3286 17.7297 13.3752 17.5784 13.3755 17.4134C13.3762 17.0067 13.4908 16.3842 13.6591 15.8722C14.1364 14.4211 15.4211 13.1364 16.8722 12.6591C17.3842 12.4908 18.0067 12.3762 18.4134 12.3755C18.5784 12.3752 18.7297 12.3286 18.8353 12.2454L19 12.1159V10.0108V7.90575L16.0466 4.95288L13.0933 2H8.17163C3.33331 2 3.24787 2.00213 3.125 2.125ZM14.1403 5.9215C15.9323 7.71288 16.125 7.92525 16.125 8.109C16.125 8.22919 16.0738 8.36369 16 8.4375C15.8769 8.56056 15.7917 8.5625 10.5312 8.5625C5.27081 8.5625 5.18556 8.56056 5.0625 8.4375C4.9425 8.3175 4.9375 8.22919 4.9375 6.23931C4.9375 4.39788 4.94906 4.15331 5.04094 4.05181C5.13881 3.94362 5.33319 3.9375 8.64994 3.9375H12.1555L14.1403 5.9215ZM5.8125 6.25V7.6875H10.1875C12.5938 7.6875 14.5625 7.66663 14.5625 7.64113C14.5625 7.61563 13.9369 6.96875 13.1724 6.20363L11.7823 4.8125H8.79738H5.8125V6.25ZM9.41788 9.69837C9.60056 9.87006 9.6065 10.1583 9.43856 10.6966C9.28912 11.1753 8.95094 11.6347 8.54106 11.9159C8.03981 12.2598 7.75331 12.3125 6.38419 12.3125C5.33844 12.3125 5.14994 12.2979 5.05181 12.2091C4.94881 12.1159 4.9375 11.9896 4.9375 10.9314C4.9375 9.78875 4.94125 9.75444 5.07644 9.65981C5.19519 9.57656 5.50906 9.5625 7.24425 9.5625C9.24137 9.5625 9.27544 9.56462 9.41788 9.69837ZM5.8125 10.9432V11.4489L6.73438 11.4276C7.61131 11.4073 7.67069 11.3977 7.95237 11.2322C8.23644 11.0652 8.5625 10.6829 8.5625 10.5168C8.5625 10.4551 8.25619 10.4375 7.1875 10.4375H5.8125V10.9432Z" fill="white" fill-opacity="0.5"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
    
    
    
    `)



    StartClock()
})

function Setdata(data) {
    $(".money").text(data.money.toLocaleString("de-DE") + " $")
    $(".account").text(data.account.toLocaleString("de-DE") + " $")
    $(".job").text(data.job)
    $(".source").text(data.source)
    $(".players").text(data.players)
}


function Scoreboard(jobs) {
    $(".police").text(jobs.police)
    $(".ambulance").text(jobs.ambulance)
    $(".mechanic").text(jobs.mechanic)
}

function SetVoiceRange(voicerange) {
    if (voicerange == "1") {
        $(range[0]).addClass('activated')
        $(range[1]).removeClass('activated')
        $(range[2]).removeClass('activated')
    } else if (voicerange == "2") {
        $(range[0]).addClass('activated')
        $(range[1]).addClass('activated')
        $(range[2]).removeClass('activated')
    } else if (voicerange == "3") {
        $(range[0]).addClass('activated')
        $(range[1]).addClass('activated')
        $(range[2]).addClass('activated')
    }
}

function Ammobox(data) {
    $(".ammo").text(data.ammo + "/" + data.clip)
}

function Notify(title, message, timeout) {
    var count = 1;

    $(".notifys").prepend(`
        <div class="notify" id="notify-${count}">
            <div class="bx_big">
                <img class="nf_icn" src="assets/images/logo.png" alt="">
            </div>
            <div class="row_notify">
                <span>${title}</span>
                <span>${message}</span>
            </div>
        </div>
    `);
    $("[id^='notify-']").each(function(index) {
        var el = $(this);
        setTimeout(() => {
            el.addClass("hidden");
        }, timeout);
        setTimeout(() => {
            el.remove()
        }, timeout + 500);
    });
}

function Announce(title, message, timeout) {
    $(".announce").empty();
    $(".announce").append(`
        <div class="blur_cc"></div>
        <div class="hdr_announce">
            <img src="assets/images/liness.png" alt="">
            <span>${title}</span>
            <span>overseas</span>
        </div>
        <span class="annc_text">${message}</span>
    `)
    $(".announce").fadeIn();
    setTimeout(() => {
        $(".announce").fadeOut();
    }, timeout);
}

function StartClock() {
    const today = new Date();
    let ds = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear()
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    $(".date").text(ds)
    $(".time").text(h + ":" + m)
    setTimeout(StartClock, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

function SpeedoMeter(data) {
    const speedProgress = document.getElementById('circle-progress');
    const FuelProgress = document.getElementById('circle-fuel-progress');
    const MaxSpeed = 300;
    const MaxFuel = 100;
    let speedRation = MaxSpeed / data.speed;
    let speedOffset = 100 / speedRation;
    let fuelRation = MaxFuel / data.fuel;
    let FuelOffset = 100 / fuelRation;
    setSpeedProgress(speedOffset)
    setFuelProgress(FuelOffset)
    $(".speed").text(data.speed)

    if (data.engine) {
        $(engine).addClass('activfunct')
    } else {
        $(engine).removeClass('activfunct')
    }
    if (data.key == "2") {
        $(key).addClass("activfunct")
    } else {
        $(key).removeClass('activfunct')
    }

    function setSpeedProgress(percent) {
        offsetSpeed = 196.3495 + (589.0486 - percent / 100 * 589.0486);
        if (offsetSpeed < 785.3981) {
            speedProgress.style.strokeDashoffset = offsetSpeed;
            if (offsetSpeed < 196.3495) speedProgress.style.strokeDashoffset = 196.3495;
        } else speedProgress.style.strokeDashoffset = 785.3981;
    }


    function setFuelProgress(percent) {
        offsetFuel = 654.4722 + (130.9259 - percent / 100 * 130.9259);
        if (offsetFuel < 785.3981) {
            FuelProgress.style.strokeDashoffset = offsetFuel;
            if (offsetFuel < 654.4722) FuelProgress.style.strokeDashoffset = 654.4722;
        } else FuelProgress.style.strokeDashoffset = 785.3981;
    }
}