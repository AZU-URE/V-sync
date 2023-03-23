from django.shortcuts import render

def home(request):
    return render(request,'index.html')

def candidate(request):
    return render(request,'participant1.html')

def result(request):
    return render(request,'result.html')

def loading(request):
    return render(request,'loading.html')