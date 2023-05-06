export class VerifyMailAccount {
  static createHTML(otp: string, link?: string): string {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title></title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <link
      href="https://fonts.googleapis.com/css2?family=Imprima&display=swap"
      rel="stylesheet"
    />
    <!--<![endif]-->

    <style type="text/css">
      /* CONFIG STYLES Please do not delete and edit CSS styles below */
      /* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
      #outlook a {
        padding: 0;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      /*
END OF IMPORTANT
*/
      body {
        width: 100%;
        font-family: Imprima, Arial, sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse;
        border-spacing: 0px;
      }

      table td,
      body,
      .es-wrapper {
        padding: 0;
        margin: 0;
      }

      .es-content,
      .es-header,
      .es-footer {
        table-layout: fixed !important;
        width: 100%;
      }

      img {
        display: block;
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p,
      hr {
        margin: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 0;
        line-height: 120%;
        mso-line-height-rule: exactly;
        font-family: Imprima, Arial, sans-serif;
      }

      p,
      ul li,
      ol li,
      a {
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
        mso-line-height-rule: exactly;
      }

      .es-left {
        float: left;
      }

      .es-right {
        float: right;
      }

      .es-p5 {
        padding: 5px;
      }

      .es-p5t {
        padding-top: 5px;
      }

      .es-p5b {
        padding-bottom: 5px;
      }

      .es-p5l {
        padding-left: 5px;
      }

      .es-p5r {
        padding-right: 5px;
      }

      .es-p10 {
        padding: 10px;
      }

      .es-p10t {
        padding-top: 10px;
      }

      .es-p10b {
        padding-bottom: 10px;
      }

      .es-p10l {
        padding-left: 10px;
      }

      .es-p10r {
        padding-right: 10px;
      }

      .es-p15 {
        padding: 15px;
      }

      .es-p15t {
        padding-top: 15px;
      }

      .es-p15b {
        padding-bottom: 15px;
      }

      .es-p15l {
        padding-left: 15px;
      }

      .es-p15r {
        padding-right: 15px;
      }

      .es-p20 {
        padding: 20px;
      }

      .es-p20t {
        padding-top: 10px;
      }

      .es-p20b {
        padding-bottom: 20px;
      }

      .es-p20l {
        padding-left: 20px;
      }

      .es-p20r {
        padding-right: 20px;
      }

      .es-p25 {
        padding: 25px;
      }

      .es-p25t {
        padding-top: 25px;
      }

      .es-p25b {
        padding-bottom: 25px;
      }

      .es-p25l {
        padding-left: 25px;
      }

      .es-p25r {
        padding-right: 25px;
      }

      .es-p30 {
        padding: 30px;
      }

      .es-p30t {
        padding-top: 20px;
      }

      .es-p30b {
        padding-bottom: 30px;
      }

      .es-p30l {
        padding-left: 30px;
      }

      .es-p30r {
        padding-right: 30px;
      }

      .es-p35 {
        padding: 35px;
      }

      .es-p35t {
        padding-top: 35px;
      }

      .es-p35b {
        padding-bottom: 35px;
      }

      .es-p35l {
        padding-left: 35px;
      }

      .es-p35r {
        padding-right: 35px;
      }

      .es-p40 {
        padding: 40px;
      }

      .es-p40t {
        padding-top: 20px;
      }

      .es-p40b {
        padding-bottom: 20px;
      }

      .es-p40l {
        padding-left: 40px;
      }

      .es-p40r {
        padding-right: 40px;
      }

      .es-menu td {
        border: 0;
      }

      .es-menu td a img {
        display: inline-block !important;
        vertical-align: middle;
      }

      /*
END CONFIG STYLES
*/
      s {
        text-decoration: line-through;
      }

      p,
      ul li,
      ol li {
        font-family: Imprima, Arial, sans-serif;
        line-height: 150%;
      }

      ul li,
      ol li {
        margin-bottom: 15px;
        margin-left: 0;
      }

      a {
        text-decoration: underline;
      }

      .es-menu td a {
        text-decoration: none;
        display: block;
        font-family: Imprima, Arial, sans-serif;
      }

      .es-wrapper {
        width: 100%;
        height: 100%;
        background-repeat: repeat;
        background-position: center top;
      }

      .es-wrapper-color,
      .es-wrapper {
        background-color: #ffffff;
      }

      .es-header {
        background-color: transparent;
        background-repeat: repeat;
        background-position: center top;
      }

      .es-header-body {
        background-color: #efefef;
      }

      .es-header-body p,
      .es-header-body ul li,
      .es-header-body ol li {
        color: #2d3142;
        font-size: 14px;
      }

      .es-header-body a {
        color: #2d3142;
        font-size: 14px;
      }

      .es-content-body {
        background-color: #efefef;
      }

      .es-content-body p,
      .es-content-body ul li,
      .es-content-body ol li {
        color: #2d3142;
        font-size: 18px;
      }

      .es-content-body a {
        color: #2d3142;
        font-size: 18px;
      }

      .es-footer {
        background-color: transparent;
        background-repeat: repeat;
        background-position: center top;
      }

      .es-footer-body {
        background-color: #ffffff;
      }

      .es-footer-body p,
      .es-footer-body ul li,
      .es-footer-body ol li {
        color: #2d3142;
        font-size: 14px;
      }

      .es-footer-body a {
        color: #2d3142;
        font-size: 14px;
      }

      .es-infoblock,
      .es-infoblock p,
      .es-infoblock ul li,
      .es-infoblock ol li {
        line-height: 120%;
        font-size: 12px;
        color: #cccccc;
      }

      .es-infoblock a {
        font-size: 12px;
        color: #cccccc;
      }

      h1 {
        font-size: 48px;
        font-style: normal;
        font-weight: bold;
        color: #2d3142;
      }

      h2 {
        font-size: 36px;
        font-style: normal;
        font-weight: bold;
        color: #2d3142;
      }

      h3 {
        font-size: 28px;
        font-style: normal;
        font-weight: bold;
        color: #2d3142;
      }

      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 48px;
      }

      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 36px;
      }

      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 28px;
      }

      a.es-button,
      button.es-button {
        padding: 15px 20px 15px 20px;
        display: inline-block;
        background: #4114f7;
        border-radius: 30px;
        font-size: 25px;
        font-family: Imprima, Arial, sans-serif;
        font-weight: bold;
        font-style: normal;
        line-height: 120%;
        color: #ffffff;
        text-decoration: none;
        width: auto;
        text-align: center;
      }

      .es-button-border {
        border-style: solid solid solid solid;
        border-color: #2cb543 #2cb543 #2cb543 #2cb543;
        background: #4114f7;
        border-width: 0px 0px 0px 0px;
        display: inline-block;
        border-radius: 30px;
        width: auto;
        mso-border-alt: 10px;
      }

      .msohide {
        mso-hide: all;
      }

      /* RESPONSIVE STYLES Please do not delete and edit CSS styles below. If you don't need responsive layout, please delete this section. */
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }

        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120%;
        }

        h1 {
          font-size: 30px !important;
          text-align: left;
        }

        h2 {
          font-size: 24px !important;
          text-align: left;
        }

        h3 {
          font-size: 20px !important;
          text-align: left;
        }

        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
          text-align: left;
        }

        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 24px !important;
          text-align: left;
        }

        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left;
        }

        .es-menu td a {
          font-size: 14px !important;
        }

        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 14px !important;
        }

        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 14px !important;
        }

        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }

        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }

        *[class="gmail-fix"] {
          display: none !important;
        }

        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }

        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }

        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }

        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }

        .es-button-border {
          display: block !important;
        }

        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-right-width: 0px !important;
          border-left-width: 0px !important;
          border-top-width: 15px !important;
          border-bottom-width: 15px !important;
        }

        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }

        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }

        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }

        .es-m-p0 {
          padding: 0px !important;
        }

        .es-m-p0r {
          padding-right: 0px !important;
        }

        .es-m-p0l {
          padding-left: 0px !important;
        }

        .es-m-p0t {
          padding-top: 0px !important;
        }

        .es-m-p0b {
          padding-bottom: 0 !important;
        }

        .es-m-p20b {
          padding-bottom: 20px !important;
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }

        tr.es-desk-hidden {
          display: table-row !important;
        }

        table.es-desk-hidden {
          display: table !important;
        }

        td.es-desk-menu-hidden {
          display: table-cell !important;
        }

        .es-menu td {
          width: 1% !important;
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }

        table.es-social {
          display: inline-block !important;
        }

        table.es-social td {
          display: inline-block !important;
        }

        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important;
        }
      }

      /* END RESPONSIVE STYLES */
      html,
      body {
        font-family: arial, "helvetica neue", helvetica, sans-serif;
      }

      .es-p-default {
        padding-top: 20px;
        padding-right: 40px;
        padding-bottom: 0px;
        padding-left: 40px;
      }

      .es-p-all-default {
        padding: 0px;
      }
    </style>
  </head>

  <body>
    <div class="es-wrapper-color">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#ffffff"></v:fill>
        </v:background>
      <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td class="esd-email-paddings" valign="top">
              <!-- <table
                cellpadding="0"
                cellspacing="0"
                class="es-footer esd-header-popover"
                align="center"
              >
                <tbody>
                  <tr>
                    <td class="esd-stripe" align="center">
                      <table
                        bgcolor="#bcb8b1"
                        class="es-footer-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                      >
                        <tbody></tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table> -->
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
              >
                <tbody>
                  <tr>
                    <td class="esd-stripe" align="center">
                      <table
                        bgcolor="#efefef"
                        class="es-content-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                        style="border-radius: 20px 20px 0 0"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="esd-structure es-p40t es-p40r es-p40l"
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="520"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-image es-m-txt-c"
                                              style="font-size: 0px"
                                            >
                                              <a
                                                target="_blank"
                                                href="https://viewstripo.email"
                                                ><img
                                                  src="https://tlr.stripocdn.email/content/guids/CABINET_ee77850a5a9f3068d9355050e69c76d26d58c3ea2927fa145f0d7a894e624758/images/group_4076323.png"
                                                  alt="Confirm email"
                                                  style="
                                                    display: block;
                                                    border-radius: 100px;
                                                  "
                                                  width="100"
                                                  title="Confirm email"
                                              /></a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="es-p20t es-p40r es-p40l esd-structure"
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="520"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        bgcolor="#fafafa"
                                        style="
                                          background-color: #fafafa;
                                          border-radius: 10px;
                                          border-collapse: separate;
                                        "
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text es-p20"
                                            >
                                              <!-- <h3>Welcome,&nbsp;Gregory</h3> -->
                                              <h3>Welcome to Tech Shop!</h3>

                                              <p><br /></p>
                                              <!-- <p>
                                                You're receiving this message
                                                because you recently signed up
                                                for a account.<br /><br />Confirm
                                                your email address by clicking
                                                the button below. This step adds
                                                extra security to your business
                                                by verifying you own this email.
                                              </p> -->
                                              <p>
                                                You're receiving this message
                                                because you recently signed up
                                                for a account.<br /><br />Your
                                                OTP code below. You need it to
                                                be able to verify your
                                                registered account!
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
              >
                <tbody>
                  <tr>
                    <td class="esd-stripe" align="center">
                      <table
                        bgcolor="#efefef"
                        class="es-content-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="esd-structure es-p30t es-p40b es-p40r es-p40l"
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="520"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="40%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-button"
                                            >
                                              <!--[if mso
                                                ]><a
                                                  href=""
                                                  target="_blank"
                                                  hidden
                                                >
                                                  <v:roundrect
                                                    xmlns:v="urn:schemas-microsoft-com:vml"
                                                    xmlns:w="urn:schemas-microsoft-com:office:word"
                                                    esdevVmlButton
                                                    href=""
                                                    style="
                                                      height: 56px;
                                                      v-text-anchor: middle;
                                                      width: 520px;
                                                    "
                                                    arcsize="50%"
                                                    stroke="f"
                                                    fillcolor="#7630f3"
                                                  >
                                                    <w:anchorlock></w:anchorlock>
                                                    <center
                                                      style="
                                                        color: #ffffff;
                                                        font-family: Imprima,
                                                          Arial, sans-serif;
                                                        font-size: 22px;
                                                        font-weight: 700;
                                                        line-height: 22px;
                                                        mso-text-raise: 1px;
                                                      "
                                                    >
                                                      Confirm email
                                                    </center>
                                                  </v:roundrect></a
                                                >
                                              <![endif]-->
                                              <!--[if !mso]><!-- -->
                                              <!-- <span
                                                class="msohide es-button-border"
                                                style="
                                                  display: block;
                                                  background: #7630f3;
                                                "
                                                ><a
                                                  href
                                                  class="es-button msohide"
                                                  target="_blank"
                                                  style="
                                                    padding-left: 5px;
                                                    padding-right: 5px;
                                                    display: block;
                                                    background: #7630f3;
                                                    border-color: #7630f3;
                                                  "
                                                  >Confirm email</a
                                                ></span
                                              > -->
                                              <!--[if !mso]><!-- --><span
                                                class="msohide es-button-border"
                                                style="
                                                  display: block;
                                                  background: #7630f3;
                                                "
                                                ><a
                                                  class="es-button msohide"
                                                  target="_blank"
                                                  style="
                                                    padding-left: 5px;
                                                    padding-right: 5px;
                                                    display: block;
                                                    background: #6aa84f;
                                                    border-color: #6aa84f;
                                                  "
                                                  >${otp}</a
                                                ></span
                                              >
                                              <!--<![endif]-->
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="esd-structure es-p40r es-p40l"
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="520"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                            >
                                            <a
                                                rel="stylesheet"
                                                href="${link}"
                                                target="_blank"
                                                >Nhấn vào đây để xác nhận nhanh
                                                tài khoản!</a
                                              >
                                              <p>Thanks,<br />Tech Shop</p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-spacer es-p40t es-p20b"
                                              style="font-size: 0"
                                            >
                                              <table
                                                border="0"
                                                width="100%"
                                                height="100%"
                                                cellpadding="0"
                                                cellspacing="0"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        border-bottom: 1px solid
                                                          #666666;
                                                        background: unset;
                                                        height: 1px;
                                                        width: 100%;
                                                        margin: 0px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
              >
                <tbody>
                  <tr>
                    <td class="esd-stripe" align="center">
                      <table
                        bgcolor="#efefef"
                        class="es-content-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                        style="border-radius: 0 0 20px 20px"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="esd-structure es-p20t es-p20b es-p40r es-p40l esdev-adapt-off"
                              align="left"
                            >
                              <table
                                width="520"
                                cellpadding="0"
                                cellspacing="0"
                                class="esdev-mso-table"
                              >
                                <tbody>
                                  <tr>
                                    <td class="esdev-mso-td" valign="top">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="left"
                                        class="es-left"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              width="47"
                                              class="esd-container-frame"
                                              align="center"
                                              valign="top"
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      class="esd-block-image es-m-txt-l"
                                                      style="font-size: 0px"
                                                    >
                                                      <a
                                                        target="_blank"
                                                        href="https://viewstripo.email"
                                                        ><img
                                                          src="https://tlr.stripocdn.email/content/guids/CABINET_ee77850a5a9f3068d9355050e69c76d26d58c3ea2927fa145f0d7a894e624758/images/group_4076325.png"
                                                          alt="Demo"
                                                          style="display: block"
                                                          width="47"
                                                          title="Demo"
                                                      /></a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                    <td width="20"></td>
                                    <td class="esdev-mso-td" valign="top">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="es-right"
                                        align="right"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              width="453"
                                              class="esd-container-frame"
                                              align="center"
                                              valign="top"
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="left"
                                                      class="esd-block-text"
                                                    >
                                                      <p
                                                        style="font-size: 16px"
                                                      >
                                                        This link expire in 24
                                                        hours. If you have
                                                        questions,
                                                        <a
                                                          target="_blank"
                                                          style="
                                                            font-size: 16px;
                                                          "
                                                          href="https://viewstripo.email"
                                                          >we're here to help</a
                                                        >
                                                      </p>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-footer"
                align="center"
              >
                <tbody>
                  <tr>
                    <td class="esd-stripe" align="center">
                      <table
                        bgcolor="#bcb8b1"
                        class="es-footer-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="esd-structure es-p40t es-p30b es-p20r es-p20l"
                              align="left"
                              esd-custom-block-id="853188"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="560"
                                      align="left"
                                      class="esd-container-frame"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-social es-m-txt-c es-p10t es-p20b"
                                              style="font-size: 0"
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                class="es-table-not-adapt es-social"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      esd-tmp-icon-type="twitter"
                                                      class="es-p5r"
                                                    >
                                                      <a target="_blank" href
                                                        ><img
                                                          src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png"
                                                          alt="Tw"
                                                          title="Twitter"
                                                          height="24"
                                                      /></a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      esd-tmp-icon-type="facebook"
                                                      class="es-p5r"
                                                    >
                                                      <a target="_blank" href
                                                        ><img
                                                          src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                                          alt="Fb"
                                                          title="Facebook"
                                                          height="24"
                                                      /></a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      esd-tmp-icon-type="linkedin"
                                                    >
                                                      <a target="_blank" href
                                                        ><img
                                                          src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png"
                                                          alt="In"
                                                          title="Linkedin"
                                                          height="24"
                                                      /></a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-text"
                                              esd-links-underline="none"
                                            >
                                              <p style="font-size: 13px">
                                                <a
                                                  target="_blank"
                                                  style="text-decoration: none"
                                                ></a
                                                ><a
                                                  target="_blank"
                                                  style="text-decoration: none"
                                                  >Privacy Policy</a
                                                ><a
                                                  target="_blank"
                                                  style="
                                                    font-size: 13px;
                                                    text-decoration: none;
                                                  "
                                                ></a>
                                                •
                                                <a
                                                  target="_blank"
                                                  style="text-decoration: none"
                                                  >Unsubscribe</a
                                                >
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-text es-p20t"
                                              esd-links-underline="none"
                                            >
                                              <p>
                                                <a target="_blank"></a>Copyright
                                                © 2023&nbsp;Company<a
                                                  target="_blank"
                                                ></a>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;
  }
}
