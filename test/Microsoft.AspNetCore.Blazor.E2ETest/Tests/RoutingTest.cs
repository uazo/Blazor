// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using System;
using System.Linq;
using System.Runtime.InteropServices;
using BasicTestApp;
using BasicTestApp.RouterTest;
using Microsoft.AspNetCore.Blazor.E2ETest.Infrastructure;
using Microsoft.AspNetCore.Blazor.E2ETest.Infrastructure.ServerFixtures;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using Xunit;
using Xunit.Abstractions;

namespace Microsoft.AspNetCore.Blazor.E2ETest.Tests
{
    public class RoutingTest : BasicTestAppTestBase
    {
        public RoutingTest(
            BrowserFixture browserFixture,
            ToggleExecutionModeServerFixture<Program> serverFixture,
            ITestOutputHelper output)
            : base(browserFixture, serverFixture, output)
        {
            Navigate(ServerPathBase, noReload: false);
            WaitUntilTestSelectorReady();
        }

        [Fact]
        public void CanArriveAtDefaultPage()
        {
            SetUrlViaPushState("/");

            var app = MountTestComponent<TestRouter>();
            Assert.Equal("This is the default page.", app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Default (matches all)", "Default with base-relative URL (matches all)");
        }

        [Fact]
        public void CanArriveAtDefaultPageWithoutTrailingSlash()
        {
            // This is a bit of a degenerate case because ideally devs would configure their
            // servers to enforce a canonical URL (with trailing slash) for the homepage.
            // But in case they don't want to, we need to handle it the same as if the URL does
            // have a trailing slash.
            SetUrlViaPushState("");

            var app = MountTestComponent<TestRouter>();
            Assert.Equal("This is the default page.", app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Default (matches all)", "Default with base-relative URL (matches all)");
        }

        [Fact]
        public void CanArriveAtPageWithParameters()
        {
            SetUrlViaPushState("/WithParameters/Name/Ghi/LastName/O'Jkl");

            var app = MountTestComponent<TestRouter>();
            Assert.Equal("Your full name is Ghi O'Jkl.", app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks();
        }

        [Fact]
        public void CanArriveAtNonDefaultPage()
        {
            SetUrlViaPushState("/Other");

            var app = MountTestComponent<TestRouter>();
            Assert.Equal("This is another page.", app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Other", "Other with base-relative URL (matches all)");
        }

        [Fact]
        public void CanFollowLinkToOtherPage()
        {
            SetUrlViaPushState("/");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("Other")).Click();
            WaitAssert.Equal("This is another page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Other", "Other with base-relative URL (matches all)");
        }

        [Fact]
        public void CanFollowLinkToOtherPageWithCtrlClick()
        {
            // On macOS we need to hold the command key not the control for opening a popup
            var key = RuntimeInformation.IsOSPlatform(OSPlatform.OSX) ? Keys.Command : Keys.Control;

            try
            {
                SetUrlViaPushState("/");

                var app = MountTestComponent<TestRouter>();
                var button = app.FindElement(By.LinkText("Other"));
              
                new Actions(Browser).KeyDown(key).Click(button).Build().Perform();

                WaitAssert.Equal(2, () => Browser.WindowHandles.Count);
            }
            finally
            {
                // Leaving the ctrl key up 
                new Actions(Browser).KeyUp(key).Build().Perform();

                // Closing newly opened windows if a new one was opened
                while (Browser.WindowHandles.Count > 1)
                {
                    Browser.SwitchTo().Window(Browser.WindowHandles.Last());
                    Browser.Close();
                }

                // Needed otherwise Selenium tries to direct subsequent commands
                // to the tab that has already been closed
                Browser.SwitchTo().Window(Browser.WindowHandles.First());
            }
        }

        [Fact]
        public void CanFollowLinkToOtherPageDoesNotOpenNewWindow()
        {
            SetUrlViaPushState("/");

            var app = MountTestComponent<TestRouter>();
            
            app.FindElement(By.LinkText("Other")).Click();
            
            Assert.Single(Browser.WindowHandles);
        }

        [Fact]
        public void CanFollowLinkToOtherPageWithBaseRelativeUrl()
        {
            SetUrlViaPushState("/");            

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("Other with base-relative URL (matches all)")).Click();
            WaitAssert.Equal("This is another page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Other", "Other with base-relative URL (matches all)");
        }

        [Fact]
        public void CanFollowLinkToEmptyStringHrefAsBaseRelativeUrl()
        {
            SetUrlViaPushState("/Other");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("Default with base-relative URL (matches all)")).Click();
            WaitAssert.Equal("This is the default page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Default (matches all)", "Default with base-relative URL (matches all)");
        }

        [Fact]
        public void CanFollowLinkToPageWithParameters()
        {
            SetUrlViaPushState("/Other");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("With parameters")).Click();
            WaitAssert.Equal("Your full name is Abc McDef.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("With parameters");
        }

        [Fact]
        public void CanFollowLinkToDefaultPage()
        {
            SetUrlViaPushState("/Other");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("Default (matches all)")).Click();
            WaitAssert.Equal("This is the default page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Default (matches all)", "Default with base-relative URL (matches all)");
        }

        [Fact]
        public void CanFollowLinkToOtherPageWithQueryString()
        {
            SetUrlViaPushState("/");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("Other with query")).Click();
            WaitAssert.Equal("This is another page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Other", "Other with query");
        }

        [Fact]
        public void CanFollowLinkToDefaultPageWithQueryString()
        {
            SetUrlViaPushState("/Other");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("Default with query")).Click();
            WaitAssert.Equal("This is the default page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Default with query");
        }

        [Fact]
        public void CanFollowLinkToOtherPageWithHash()
        {
            SetUrlViaPushState("/");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("Other with hash")).Click();
            WaitAssert.Equal("This is another page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Other", "Other with hash");
        }

        [Fact]
        public void CanFollowLinkToDefaultPageWithHash()
        {
            SetUrlViaPushState("/Other");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.LinkText("Default with hash")).Click();
            WaitAssert.Equal("This is the default page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Default with hash");
        }

        [Fact]
        public void CanNavigateProgrammatically()
        {
            SetUrlViaPushState("/");

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.TagName("button")).Click();
            WaitAssert.Equal("This is another page.", () => app.FindElement(By.Id("test-info")).Text);
            AssertHighlightedLinks("Other", "Other with base-relative URL (matches all)");
        }

        [Fact]
        public void ClickingAnchorWithNoHrefShouldNotNavigate()
        {
            SetUrlViaPushState("/");
            var initialUrl = Browser.Url;

            var app = MountTestComponent<TestRouter>();
            app.FindElement(By.Id("anchor-with-no-href")).Click();

            Assert.Equal(initialUrl, Browser.Url);
            AssertHighlightedLinks("Default (matches all)", "Default with base-relative URL (matches all)");
        }

        private void SetUrlViaPushState(string relativeUri)
        {
            var pathBaseWithoutHash = ServerPathBase.Split('#')[0];
            var jsExecutor = (IJavaScriptExecutor)Browser;
            var absoluteUri = new Uri(_serverFixture.RootUri, $"{pathBaseWithoutHash}{relativeUri}");
            jsExecutor.ExecuteScript($"Blazor.navigateTo('{absoluteUri.ToString().Replace("'", "\\'")}')");
        }

        private void AssertHighlightedLinks(params string[] linkTexts)
        {
            WaitAssert.Equal(linkTexts, () => Browser
                .FindElements(By.CssSelector("a.active"))
                .Select(x => x.Text));
        }
    }
}
