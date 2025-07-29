{{/* Generate app name */}}
{{- define "flask-app.name" -}}
flask-app
{{- end -}}

{{/* Generate full name */}}
{{- define "flask-app.fullname" -}}
flask-app
{{- end -}}

{{/* Common labels */}}
{{- define "flask-app.labels" -}}
app: {{ include "flask-app.name" . }}
{{- end -}}
