from django.shortcuts import render

# Create your views here.
def home(request):
    context = {'hello': 'hello'}
    return render(request, 'receive/index.html' ,context)