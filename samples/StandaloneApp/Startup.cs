// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using Microsoft.AspNetCore.Blazor.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Blazor.Forms;

namespace StandaloneApp
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
        }

        public void Configure(IBlazorApplicationBuilder app)
        {
            app.AddComponent<App>("app");
            app.AddForms();
            app.AddDatePicker();
            app.AddGritter();
            app.AddDropZone();
            app.AddDX();
        }
    }
}
