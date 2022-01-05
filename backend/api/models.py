from django.db import models


# model for user class
class User(models.Model):
    username = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.CharField(max_length=32)

    def __str__(self):
        return "%s %s" % (self.username, self.email)


# Models for the code snippet card
class CodeSnippets(models.Model):

    # the title of the snippet
    title = models.CharField(max_length=50)
    # category of the snippet (e.g., web dev, mobile, backend, data analysis, etc)
    category = models.CharField(max_length=50)
    # content (in MarkDown)
    content = models.TextField(max_length=2000)
    # publish date/time
    pub_date = models.DateTimeField()
    # the author of the snippet
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['pub_date']
