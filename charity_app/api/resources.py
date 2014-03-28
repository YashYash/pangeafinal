from django.conf import settings
from django.contrib.auth.models import User
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization
from tastypie.bundle import Bundle
from tastypie.fields import CharField, ToOneField, ToManyField, IntegerField
from tastypie.resources import ModelResource, Resource
from charity_app.api.authorization import UserObjectsOnlyAuthorization
from charity_app.models import Charity, Video, ClickCount
from giver_app.models import Giver, GiverCount


class CharityResource(ModelResource):
    givers = ToManyField('giver_app.api.resources.GiverResource', 'givers', full=True)

    class Meta:
        queryset = Charity.objects.all()
        # authentication = BasicAuthentication()
        # authorization = UserObjectsOnlyAuthorization()
        resource_name = "charity"
        allowed_methods = ['get', 'post']


class GiverResource(ModelResource):
    charity = ToManyField(CharityResource, 'charity', full=True)

    class Meta:
        queryset = Giver.objects.all()
        # authentication = BasicAuthentication()
        # authorization = UserObjectsOnlyAuthorization()
        resource_name = "giver"
        allowed_methods = ['get', 'post']


class VideoResource(ModelResource):
    class Meta:
        queryset = Video.objects.all()
        resource_name = "charity"


class UserResource(ModelResource):
    charity = ToOneField(CharityResource, 'charity', full=True)

    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        # authentication = BasicAuthentication()


class ClickCountResource(ModelResource):
    video = ToOneField(VideoResource, 'video', full=False)
    user = ToOneField(UserResource, 'user', full=False, blank=True)

    class Meta:
        queryset = ClickCount.objects.all()
        resource_name = "click_count"
        authorization = UserObjectsOnlyAuthorization()
        authentication = BasicAuthentication()
        allowed_methods = ['get', 'post']


class GiverCountResource(ModelResource):
    giver = ToOneField(GiverResource, 'giver', full=False)
    user = ToOneField(UserResource, 'user', full=False, blank=True)

    class Meta:
        queryset = GiverCount.objects.all()
        resource_name = "giver_count"
        authorization = UserObjectsOnlyAuthorization()
        authentication = BasicAuthentication()
        allowed_methods = ['get', 'post']


class CharityfullResource(ModelResource):
    charity = ToOneField(CharityResource, 'charity', full=True)
    shares = IntegerField()
    likes = IntegerField()
    sends = IntegerField()


    class Meta:
        queryset = Video.objects.all()
        resource_name = "charity_full"
        authorization = Authorization()
        allowed_methods = ['get', 'post']

    def dehydrate_shares(self, bundle):
        return bundle.obj.clickcount_set.filter(facebook_count="share").count()

    def dehydrate_likes(self, bundle):
        return bundle.obj.clickcount_set.filter(facebook_count="like").count()

    def dehydrate_sends(self, bundle):
        return bundle.obj.clickcount_set.filter(facebook_count="send").count()


######################
# Non-Model Resource #
######################

class Version(object):
    def __init__(self, identifier=None):
        self.identifier = identifier


class VersionResource(Resource):
    identifier = CharField(attribute='identifier')

    class Meta:
        resource_name = 'version'
        allowed_methods = ['get']
        object_class = Version
        include_resource_uri = False

    def detail_uri_kwargs(self, bundle_or_obj):
        kwargs = {}

        if isinstance(bundle_or_obj, Bundle):
            kwargs['pk'] = bundle_or_obj.obj.identifier
        else:
            kwargs['pk'] = bundle_or_obj['identifier']

        return kwargs

    def get_object_list(self, bundle, **kwargs):
        return [Version(identifier=settings.VERSION)]

    def obj_get_list(self, bundle, **kwargs):
        return self.get_object_list(bundle, **kwargs)