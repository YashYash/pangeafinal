from django.contrib import admin
from giver_app.models import Giver, GiverCount


class GiverAdmin(admin.ModelAdmin):
    search_fields = ("name",)
    # readonly_fields = ("user",)


admin.site.register(Giver, GiverAdmin)
admin.site.register(GiverCount)