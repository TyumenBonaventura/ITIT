using BusinessLibrary.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AspNetCoreReactRedux
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // Этот метод вызывается средой выполнения. Используется для добавления служб в контейнер.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IRateService, RateService>();
            services.AddTransient<IDayOfWeekService, DayOfWeekService>();
            services.AddTransient<IReservationStatusService, ReservationStatusService>();
            services.AddTransient<IGenderService, GenderService>();
            services.AddTransient<IAgeCategoryService, AgeCategoryService>();
            services.AddTransient<IEquipmentTypeService, EquipmentTypeService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IDocTypeService, DocTypeService>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // В процессе выполнения файлы React будут обслуживаться из этого каталога
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // Этот метод вызывается средой выполнения. Используется для настройки конвейера HTTP-запросов.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    //  spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
                    spa.Options.StartupTimeout = new TimeSpan(0, 5, 0);
                    spa.UseReactDevelopmentServer(npmScript: "start");

                }
            });
        }
    }
}