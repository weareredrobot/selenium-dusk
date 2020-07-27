<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class TestTest extends DuskTestCase
{
  public function testRegister() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1920, 1057)
        ->assertPresent(".link:nth-child(2)")->click(".link:nth-child(2)")
        ->type("#email","admin@example.com")
        ->type("#password","password")
        ->assertPresent("#name")->click("#name")
        ->type("#name","Gary Renes")
        ->type("#email","test@example.com")
        ->type("#password","test")
        ->type("#password","password")
        ->type("#password_confirmation","password")
        ->assertPresent(".form-control:nth-child(1)")->click(".form-control:nth-child(1)")
        ->assertPresent("div > .link:nth-child(2)")->click("div > .link:nth-child(2)");
    });
  }
  
  public function testCreateJobNoFlexibilitySet() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1920, 1057)
        ->assertPresent("div:nth-child(1) > .ui-button:nth-child(1)")->click("div:nth-child(1) > .ui-button:nth-child(1)")
        ->type("#E-Mail\ Address","admin@example.com")
        ->type("#Password","password")
        ->assertPresent(".form-control:nth-child(1)")->click(".form-control:nth-child(1)")
        ->assertPresent(".mb-3 > .ui-button")->click(".mb-3 > .ui-button")
        ->assertPresent("#company\[name\]")->click("#company\[name\]")
        ->type("#company\[name\]","Test Company")
        ->assertPresent("#company\[company_size\]")->click("#company\[company_size\]")
        ->select("#company\[company_size\]", "Less than 10 employees")
        ->assertPresent("#job\[email\]")->click("#job\[email\]")
        ->type("#job\[email\]","test@test.com")
        ->type("#job\[title\]","Test Job")
        ->type("#job\[payment_amount\]","10")
        ->assertPresent("#job\[payment_frequency\]")->click("#job\[payment_frequency\]")
        ->select("#job\[payment_frequency\]", "Hourly")
        ->assertPresent("#job\[description\]")->click("#job\[description\]")
        ->type("#job\[description\]","Test job description")
        ->assertPresent(".form-control > .control-label:nth-child(2)")->click(".form-control > .control-label:nth-child(2)")
        ->assertPresent("#job\[city\]")->click("#job\[city\]")
        ->type("#job\[city\]","Bristol")
        ->type("#job\[post_code\]","BS1")
        ->type("#tags","none none")
        ->type("#job\[expires_at\]","2021-06-25")
        ->assertPresent(".form-control:nth-child(1)")->click(".form-control:nth-child(1)")
        ->assertPresent("div > .link:nth-child(2)")->click("div > .link:nth-child(2)");
    });
  }
  
  public function testApplyForJobUploadMyOwnCv() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1407, 789)
        ->assertPresent("div:nth-child(1) > .ui-button:nth-child(1)")->click("div:nth-child(1) > .ui-button:nth-child(1)")
        ->assertPresent("#E-Mail\ Address")->click("#E-Mail\ Address")
        ->type("#E-Mail\ Address","admin@example.com")
        ->type("#Password","password")
        ->assertPresent(".form-control:nth-child(1)")->click(".form-control:nth-child(1)")
        ->assertPresent(".ui-panel:nth-child(1) .primary")->click(".ui-panel:nth-child(1) .primary")
        ->assertPresent("#message")->click("#message")
        ->type("#message","Hello, I'm applying for a job.")
        ->type("#cv","/home/disturbed/Documents/Red Robot Invoice - June.pdf")
        ->assertPresent("#availability_date")->click("#availability_date")
        ->type("#availability_date","2020-06-25")
        ->assertPresent(".form-control:nth-child(1)")->click(".form-control:nth-child(1)")
        ->assertPresent("div > .link:nth-child(2)")->click("div > .link:nth-child(2)");
    });
  }
  
  public function testApplyForJobUseProfileCv() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1407, 789)
        ->assertPresent("div:nth-child(1) > .ui-button:nth-child(1)")->click("div:nth-child(1) > .ui-button:nth-child(1)")
        ->assertPresent("#E-Mail\ Address")->click("#E-Mail\ Address")
        ->type("#E-Mail\ Address","admin@example.com")
        ->type("#Password","password")
        ->keys("#Password","{enter}")
        ->assertPresent(".ui-panel:nth-child(1) .primary")->click(".ui-panel:nth-child(1) .primary")
        ->assertPresent("#message")->click("#message")
        ->type("#message","Hello, I am applying with my profile CV.")
        ->assertPresent("#availability_date")->click("#availability_date")
        ->type("#availability_date","2020-06-26")
        ->assertPresent(".form-control:nth-child(1)")->click(".form-control:nth-child(1)")
        ->assertPresent("div > .link:nth-child(2)")->click("div > .link:nth-child(2)");
    });
  }
  
  public function testUserProfileUploadFilesAndSaveForm() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1876, 1053)
        ->assertPresent("div:nth-child(1) > .ui-button:nth-child(1)")->click("div:nth-child(1) > .ui-button:nth-child(1)")
        ->assertPresent("#E-Mail\ Address")->click("#E-Mail\ Address")
        ->type("#E-Mail\ Address","admin@example.com")
        ->type("#Password","password")
        ->keys("#Password","{enter}")
        ->assertPresent("div:nth-child(1) > .ui-button:nth-child(1)")->click("div:nth-child(1) > .ui-button:nth-child(1)")
        ->type("#picture","/home/disturbed/Pictures/Screenshot from 2020-05-14 19-12-19.png")
        ->type("#cv","/home/disturbed/Documents/Red Robot Invoice - June.pdf")
        ->assertPresent("#first_name")->click("#first_name")
        ->type("#first_name","Ricardo")
        ->type("#last_name","Graça")
        ->type("#bio","Hello it's me!")
        ->assertPresent(".form-control:nth-child(1)")->click(".form-control:nth-child(1)")
        ->assertPresent("img")->click("img")
        ->assertPresent(".alert:nth-child(7)")->click(".alert:nth-child(7)")
        ->assertPresent(".alert:nth-child(9)")->click(".alert:nth-child(9)")
        ->assertPresent(".success")->click(".success")
        ->assertPresent("div > .link:nth-child(2)")->click("div > .link:nth-child(2)");
    });
  }
  
  public function testSearchWords() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1407, 789)
        ->assertPresent(".mr-1")->click(".mr-1")
        ->type(".mr-1","ut")
        ->keys(".mr-1","{enter}")
        ->assertPresent(".mb-3 > h1")->click(".mb-3 > h1");
    });
  }
  
  public function testSearchHashtags() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1407, 789)
        ->assertPresent(".mr-1")->click(".mr-1")
        ->type(".mr-1","#non")
        ->keys(".mr-1","{enter}")
        ->assertPresent(".mb-3 > h1")->click(".mb-3 > h1");
    });
  }
  
  public function testSearchType() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1876, 1053)
        ->assertPresent(".form-group:nth-child(1) > .control-label")->click(".form-group:nth-child(1) > .control-label")
        ->assertPresent("input:nth-child(7)")->click("input:nth-child(7)")
        ->assertPresent(".mb-3 > h1")->click(".mb-3 > h1");
    });
  }
  
  public function testSearchLocation() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1407, 789)
        ->assertPresent(".mb-3 > input")->click(".mb-3 > input")
        ->type(".mb-3 > input","b")
        ->keys(".mb-3 > input","{enter}")
        ->assertPresent(".mb-3 > h1")->click(".mb-3 > h1");
    });
  }
  
  public function testResetPasswordRequestIsSent() {
    $this->browse(function (Browser $browser) {
      $browser
        ->visit("/")
        ->resize(1876, 1053)
        ->assertPresent("div:nth-child(1) > .ui-button:nth-child(1)")->click("div:nth-child(1) > .ui-button:nth-child(1)")
        ->assertPresent(".login_options > a:nth-child(1)")->click(".login_options > a:nth-child(1)")
        ->assertPresent("#email")->click("#email")
        ->type("#email","admin@example.com")
        ->keys("#email","{enter}")
        ->assertPresent(".alert")->click(".alert");
    });
  }
  
}